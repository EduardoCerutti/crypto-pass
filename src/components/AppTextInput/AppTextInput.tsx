import { TextInput, TextInputProps, TouchableOpacity, View } from "react-native"
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

  return (
    <View style={appTextInputStyles.rowContainer}>
      <TextInput secureTextEntry={showValue} {...rest} />

      {copyFunction !== undefined && (
        <TouchableOpacity onPress={() => copyFunction()}>
          <Feather name="copy" size={20} color={colors.text} />
        </TouchableOpacity>
      )}

      {secureTextEntry !== undefined && setShowValue && (
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
