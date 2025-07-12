import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native"
import { homeStyles } from "./Home.styles"
import { globalStyles } from "../../styles/Global"
import { colors } from "../../themes/Dark"
import { useCallback, useEffect, useState } from "react"
import AppTextInput from "../../components/AppTextInput/AppTextInput"
import { generateHash } from "../../utils/crypto/encrypt"
import { setStringAsync } from "expo-clipboard"

const Home: React.FC = () => {
  const [passphrase, setPassphrase] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [hashedPassword, sethashedPassword] = useState("Final password")

  const [isGenerating, setIsGenerating] = useState(false)

  const generateHashedPassword = useCallback(() => {
    if (password && passphrase) {
      setIsGenerating(true)

      requestIdleCallback(() => {
        const result = generateHash(password, passphrase)
        sethashedPassword(result)
        setIsGenerating(false)
      })
    }
  }, [password, passphrase])

  useEffect(() => {
    generateHashedPassword()
  }, [generateHashedPassword])

  const copyHashedPassword = async () => {
    await setStringAsync(hashedPassword)
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

      <ScrollView contentContainerStyle={homeStyles.content}>
        <AppTextInput
          placeholder="Passphrase"
          placeholderTextColor={colors.text}
          style={globalStyles.input}
          value={passphrase}
          secureTextEntry={true}
          onChangeText={setPassphrase}
        />

        <AppTextInput
          placeholder="Password"
          placeholderTextColor={colors.text}
          style={globalStyles.input}
          value={password}
          secureTextEntry={true}
          onChangeText={setPassword}
        />

        {isGenerating ? (
          <ActivityIndicator size="large" color={colors.spinner} />
        ) : (
          <AppTextInput
            value={hashedPassword}
            style={globalStyles.text}
            editable={false}
            secureTextEntry={true}
            copyFunction={copyHashedPassword}
          />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Home
