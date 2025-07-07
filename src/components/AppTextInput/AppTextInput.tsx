import { TextInput, TextInputProps, TouchableOpacity, View } from "react-native"
import { colors } from "../../themes/Dark"
import { Dispatch, SetStateAction } from "react"
import { Feather } from "@expo/vector-icons"
import { appTextInputStyles } from "./AppTextInput.styles"

type AppTextInputProps = TextInputProps & {
  showValue?: boolean
  setShowValue?: Dispatch<SetStateAction<boolean>>
  copyFunction?: () => Promise<void>
}

const AppTextInput: React.FC<AppTextInputProps> = ({
  showValue,
  setShowValue,
  copyFunction,
  ...rest
}: AppTextInputProps) => {
  return (
    <View style={appTextInputStyles.rowContainer}>
      <TextInput {...rest} />

      {copyFunction !== undefined && (
        <TouchableOpacity onPress={() => copyFunction()}>
          <Feather name="copy" size={20} color={colors.text} />
        </TouchableOpacity>
      )}

      {showValue !== undefined && setShowValue && (
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
