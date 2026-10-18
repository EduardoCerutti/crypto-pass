import {
  Platform,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native"
import { colors } from "../../themes/Dark"
import { useState } from "react"
import { Feather } from "@expo/vector-icons"
import { appTextInputStyles } from "./AppTextInput.styles"

type AppTextInputProps = TextInputProps & {
  secureTextEntry?: boolean
  copyFunction?: () => Promise<void>
}

const AppTextInput: React.FC<AppTextInputProps> = ({
  secureTextEntry,
  copyFunction,
  ...rest
}: AppTextInputProps) => {
  const [showValue, setShowValue] = useState(false)

  const isRevealed = !!secureTextEntry && showValue

  return (
    <View style={appTextInputStyles.rowContainer}>
      <TextInput
        // Keep keyboards from altering or learning what is typed: any change
        // to the input changes the generated password
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="off"
        spellCheck={false}
        importantForAutofill="no"
        keyboardType={
          isRevealed && Platform.OS === "android"
            ? "visible-password"
            : "default"
        }
        {...rest}
        secureTextEntry={!!secureTextEntry && !showValue}
      />

      {copyFunction !== undefined && (
        <TouchableOpacity onPress={() => copyFunction()}>
          <Feather name="copy" size={20} color={colors.text} />
        </TouchableOpacity>
      )}

      {secureTextEntry && (
        <TouchableOpacity onPress={() => setShowValue(!showValue)}>
          <Feather
            name={showValue ? "eye-off" : "eye"}
            size={20}
            color={colors.text}
          />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default AppTextInput
