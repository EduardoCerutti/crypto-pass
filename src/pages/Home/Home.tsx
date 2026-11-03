import {
  ActivityIndicator,
  Alert,
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
import Tour from "../../components/Tour/Tour"
import { hasSeenTour, markTourSeen } from "../../utils/storage/tour"
import { Feather } from "@expo/vector-icons"
import {
  AlgorithmVersion,
  generateHashV2,
  normalizeSite,
} from "../../utils/crypto/encrypt"
import { setStringAsync } from "expo-clipboard"
import {
  enableAppSwitcherProtectionAsync,
  preventScreenCaptureAsync,
} from "expo-screen-capture"
import { t } from "../../i18n"

const CLIPBOARD_CLEAR_SECONDS = 30

const algorithmOptions: { version: AlgorithmVersion; labelKey: string }[] = [
  { version: "v2-fast", labelKey: "home.versionFast" },
  { version: "v2", labelKey: "home.versionStandard" },
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
  const [isTourVisible, setIsTourVisible] = useState(() => !hasSeenTour())

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
    !!normalizeSite(site) &&
    counterValue !== undefined

  const generateHashedPassword = async () => {
    if (!canGenerate) return

    const id = ++generationId.current
    setIsGenerating(true)

    try {
      const result = await generateHashV2(
        password,
        passphrase,
        site,
        counterValue!,
        version
      )

      if (id !== generationId.current) return

      setHashedPassword(result)
      setIsCopied(false)
    } catch (error) {
      if (id !== generationId.current) return

      Alert.alert(t("home.generateError"), String(error))
    } finally {
      if (id === generationId.current) setIsGenerating(false)
    }
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

      <Tour
        visible={isTourVisible}
        onFinish={() => {
          markTourSeen()
          setIsTourVisible(false)
        }}
      />

      <ScrollView
        contentContainerStyle={homeStyles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={homeStyles.selectorRow}>
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
                <Text style={homeStyles.selectorText}>
                  {t(option.labelKey)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            accessibilityLabel={t("home.showTour")}
            onPress={() => setIsTourVisible(true)}
          >
            <Feather name="help-circle" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <AppTextInput
          placeholder={t("home.passphrase")}
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
          placeholder={t("home.password")}
          placeholderTextColor={colors.text}
          style={globalStyles.input}
          value={password}
          secureTextEntry={true}
          onChangeText={(value) => {
            setPassword(value)
            resetResult()
          }}
        />

        <View style={homeStyles.row}>
          <View style={homeStyles.siteInput}>
            <AppTextInput
              placeholder={t("home.site")}
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

        <TouchableOpacity
          style={[
            globalStyles.button,
            (!canGenerate || isGenerating) && globalStyles.buttonDisabled,
          ]}
          disabled={!canGenerate || isGenerating}
          onPress={generateHashedPassword}
        >
          <Text style={globalStyles.buttonText}>{t("home.generate")}</Text>
        </TouchableOpacity>

        {isGenerating ? (
          <ActivityIndicator size="large" color={colors.spinner} />
        ) : (
          <View>
            <AppTextInput
              value={hashedPassword ?? ""}
              placeholder={t("home.finalPassword")}
              placeholderTextColor={colors.text}
              style={globalStyles.text}
              editable={false}
              secureTextEntry={true}
              copyFunction={hashedPassword ? copyHashedPassword : undefined}
            />

            {isCopied && (
              <Text style={homeStyles.hint}>
                {t("home.copied", { seconds: CLIPBOARD_CLEAR_SECONDS })}
              </Text>
            )}
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Home
