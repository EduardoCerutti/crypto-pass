import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { homeStyles } from "./Home.styles"
import { globalStyles } from "../../styles/Global"
import { colors } from "../../themes/Dark"
import { useEffect, useRef, useState } from "react"
import AppTextInput from "../../components/AppTextInput/AppTextInput"
import {
  AlgorithmVersion,
  generateHash,
  generateHashV2,
  normalizeSite,
} from "../../utils/crypto/encrypt"
import { setStringAsync } from "expo-clipboard"
import {
  enableAppSwitcherProtectionAsync,
  preventScreenCaptureAsync,
} from "expo-screen-capture"

const CLIPBOARD_CLEAR_SECONDS = 30

const algorithmOptions: {
  version: AlgorithmVersion
  label: string
  description: string
}[] = [
  {
    version: "v1",
    label: "v1 (legacy)",
    description: "Password + passphrase. Same result for every site.",
  },
  {
    version: "v2",
    label: "v2",
    description:
      "Adds site and counter. Different result per site; raise the counter to change one site's password.",
  },
]

function parseCounter(counter: string) {
  return /^[1-9]\d{0,5}$/.test(counter) ? Number(counter) : undefined
}

const Home: React.FC = () => {
  const [version, setVersion] = useState<AlgorithmVersion>("v2")
  const [passphrase, setPassphrase] = useState("")
  const [password, setPassword] = useState("")
  const [site, setSite] = useState("")
  const [counter, setCounter] = useState("1")
  const [hashedPassword, setHashedPassword] = useState<string>()
  const [isCopied, setIsCopied] = useState(false)

  const [isGenerating, setIsGenerating] = useState(false)

  const generationId = useRef(0)
  const clipboardTimeout = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    if (Platform.OS === "web") return

    preventScreenCaptureAsync().catch(() => {})
    if (Platform.OS === "ios") {
      enableAppSwitcherProtectionAsync().catch(() => {})
    }
  }, [])

  // Any input change makes the shown result stale
  const resetResult = () => {
    generationId.current++
    setHashedPassword(undefined)
    setIsGenerating(false)
    setIsCopied(false)
  }

  const counterValue = parseCounter(counter)
  const canGenerate =
    !!password &&
    !!passphrase &&
    (version === "v1" || (!!normalizeSite(site) && counterValue !== undefined))

  const generateHashedPassword = () => {
    if (!canGenerate) return

    const id = ++generationId.current
    setIsGenerating(true)

    requestIdleCallback(() => {
      const result =
        version === "v1"
          ? generateHash(password, passphrase)
          : generateHashV2(password, passphrase, site, counterValue!)

      if (id !== generationId.current) return

      setHashedPassword(result)
      setIsCopied(false)
      setIsGenerating(false)
    })
  }

  const copyHashedPassword = async () => {
    if (!hashedPassword) return

    await setStringAsync(hashedPassword)
    setIsCopied(true)

    clearTimeout(clipboardTimeout.current)
    clipboardTimeout.current = setTimeout(() => {
      setStringAsync("")
      setIsCopied(false)
    }, CLIPBOARD_CLEAR_SECONDS * 1000)
  }

  const selectedOption = algorithmOptions.find((o) => o.version === version)!

  return (
    <KeyboardAvoidingView
      style={homeStyles.home}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : -50}
    >
      <Image
        source={require("../../../assets/logo-icon.png")}
        style={homeStyles.image}
      />

      <ScrollView
        contentContainerStyle={homeStyles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={homeStyles.selectorContainer}>
          <View style={homeStyles.selector}>
            {algorithmOptions.map((option) => (
              <TouchableOpacity
                key={option.version}
                style={[
                  homeStyles.selectorOption,
                  option.version === version &&
                    homeStyles.selectorOptionSelected,
                ]}
                onPress={() => {
                  setVersion(option.version)
                  resetResult()
                }}
              >
                <Text style={homeStyles.selectorText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={homeStyles.hint}>{selectedOption.description}</Text>
        </View>

        <AppTextInput
          placeholder="Passphrase"
          placeholderTextColor={colors.text}
          style={globalStyles.input}
          value={passphrase}
          secureTextEntry={true}
          onChangeText={(value) => {
            setPassphrase(value)
            resetResult()
          }}
        />

        <AppTextInput
          placeholder="Password"
          placeholderTextColor={colors.text}
          style={globalStyles.input}
          value={password}
          secureTextEntry={true}
          onChangeText={(value) => {
            setPassword(value)
            resetResult()
          }}
        />

        {version === "v2" && (
          <View style={homeStyles.row}>
            <View style={homeStyles.siteInput}>
              <AppTextInput
                placeholder="Site name (e.g. gmail)"
                placeholderTextColor={colors.text}
                style={globalStyles.input}
                value={site}
                onChangeText={(value) => {
                  setSite(value)
                  resetResult()
                }}
              />
            </View>

            <View style={homeStyles.counterInput}>
              <AppTextInput
                placeholder="#"
                placeholderTextColor={colors.text}
                style={globalStyles.input}
                value={counter}
                keyboardType="number-pad"
                maxLength={6}
                onChangeText={(value) => {
                  setCounter(value)
                  resetResult()
                }}
              />
            </View>
          </View>
        )}

        <TouchableOpacity
          style={[
            globalStyles.button,
            (!canGenerate || isGenerating) && globalStyles.buttonDisabled,
          ]}
          disabled={!canGenerate || isGenerating}
          onPress={generateHashedPassword}
        >
          <Text style={globalStyles.buttonText}>Generate</Text>
        </TouchableOpacity>

        {isGenerating ? (
          <ActivityIndicator size="large" color={colors.spinner} />
        ) : (
          <View>
            <AppTextInput
              value={hashedPassword ?? ""}
              placeholder="Final password"
              placeholderTextColor={colors.text}
              style={globalStyles.text}
              editable={false}
              secureTextEntry={true}
              copyFunction={hashedPassword ? copyHashedPassword : undefined}
            />

            {isCopied && (
              <Text style={homeStyles.hint}>
                Copied. Clipboard will be cleared in {CLIPBOARD_CLEAR_SECONDS}s.
              </Text>
            )}
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Home
