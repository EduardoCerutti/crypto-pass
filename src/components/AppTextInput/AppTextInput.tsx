import { TextInput, TextInputProps, TouchableOpacity, View } from "react-native"
import { colors } from "../../themes/Dark"
import { Dispatch, SetStateAction } from "react"
import { Feather } from "@expo/vector-icons"
import { appTextInputStyles } from "./AppTextInput.styles"

type AppTextInputProps = TextInputProps & {
  showValue?: boolean
  setShowValue?: Dispatch<SetStateAction<boolean>>
}

const AppTextInput: React.FC<AppTextInputProps> = ({
  showValue,
  setShowValue,
  ...rest
}: AppTextInputProps) => {
  return (
    <View style={appTextInputStyles.rowContainer}>
      <TextInput {...rest} />
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
