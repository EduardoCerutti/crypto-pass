// Apps built with the iOS 27 SDK fail to launch unless they adopt the UIScene
// life cycle. Expo ships ExpoAppSceneDelegate for this, but the SDK 57 template
// still creates the window in the AppDelegate, so this plugin switches it over.
const { withAppDelegate, withInfoPlist } = require("expo/config-plugins")

const windowSetup =
  /\n#if os\(iOS\) \|\| os\(tvOS\)\n\s*window = UIWindow\(frame: UIScreen\.main\.bounds\)\n\s*factory\.startReactNative\([\s\S]*?\)\n#endif\n/

function withSceneAppDelegate(config) {
  return withAppDelegate(config, (config) => {
    let contents = config.modResults.contents
    if (contents.includes("ExpoReactNativeFactoryProvider")) return config

    if (!windowSetup.test(contents)) {
      throw new Error(
        "with-scene-lifecycle: AppDelegate template changed, update the plugin"
      )
    }

    // ExpoAppSceneDelegate creates the window and starts React Native
    contents = contents
      .replace(windowSetup, "")
      .replace(
        "class AppDelegate: ExpoAppDelegate {",
        "class AppDelegate: ExpoAppDelegate, ExpoReactNativeFactoryProvider {"
      )

    config.modResults.contents = contents
    return config
  })
}

function withSceneManifest(config) {
  return withInfoPlist(config, (config) => {
    config.modResults.UIApplicationSceneManifest = {
      UIApplicationSupportsMultipleScenes: false,
      UISceneConfigurations: {
        UIWindowSceneSessionRoleApplication: [
          {
            UISceneConfigurationName: "Default Configuration",
            UISceneDelegateClassName: "EXExpoAppSceneDelegate",
          },
        ],
      },
    }
    return config
  })
}

module.exports = (config) => withSceneManifest(withSceneAppDelegate(config))
