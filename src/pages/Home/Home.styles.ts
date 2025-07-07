import { StyleSheet } from "react-native"
import { colors } from "../../themes/Dark"

export const homeStyles = StyleSheet.create({
  home: {
    flex: 1,
    justifyContent: "center",
    padding: 30,
    backgroundColor: colors.background,
  },
  image: {
    width: 300,
    height: 300,
  },
  content: {
    gap: 40,
  },
})
