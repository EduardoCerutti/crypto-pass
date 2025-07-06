import { StyleSheet } from "react-native"
import { colors } from "../themes/Dark"

export const globalStyles = StyleSheet.create({
  text: {
    flex: 1,
    color: colors.text,
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 0.5,
    textAlign: "center",
  },
  input: {
    flex: 1,
    backgroundColor: colors.input.background,
    color: colors.text,
    borderColor: colors.input.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
})
