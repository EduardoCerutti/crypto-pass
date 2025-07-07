import { Image, KeyboardAvoidingView, Platform, ScrollView } from "react-native"
import { homeStyles } from "./Home.styles"
import { globalStyles } from "../../styles/Global"
import { colors } from "../../themes/Dark"
import { useEffect, useState } from "react"
import AppTextInput from "../../components/AppTextInput/AppTextInput"
import { generateHash } from "../../utils/crypto/encrypt"
import { setStringAsync } from "expo-clipboard"

const Home: React.FC = () => {
  const [phrase, setPhrase] = useState<string>()

  const [password, setPassword] = useState<string>()
  const [showPassword, setShowPassword] = useState(false)

  const [hashedPassword, sethashedPassword] = useState("Final Password")
  const [showHashedPassword, setshowHashedPassword] = useState(false)

  useEffect(() => {
    if (password && phrase) sethashedPassword(generateHash(password, phrase))
  }, [password, phrase])

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
          placeholder="Phrase"
          placeholderTextColor={colors.text}
          style={globalStyles.input}
          value={phrase}
          onChangeText={setPhrase}
        />

        <AppTextInput
          placeholder="Password"
          placeholderTextColor={colors.text}
          style={globalStyles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={showPassword}
          showValue={showPassword}
          setShowValue={setShowPassword}
        />

        <AppTextInput
          value={hashedPassword}
          style={globalStyles.text}
          secureTextEntry={showHashedPassword}
          editable={false}
          showValue={showHashedPassword}
          setShowValue={setshowHashedPassword}
          copyFunction={copyHashedPassword}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Home
