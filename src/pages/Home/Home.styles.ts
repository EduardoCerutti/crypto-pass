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
  selectorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  selector: {
    flex: 1,
    flexDirection: "row",
    borderColor: colors.input.border,
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
  selectorOption: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: colors.input.background,
  },
  selectorOptionSelected: {
    backgroundColor: colors.input.border,
  },
  selectorText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "600",
  },
  hint: {
    color: colors.spinner,
    fontSize: 13,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    gap: 15,
  },
  siteInput: {
    flex: 1,
  },
  counterInput: {
    width: 70,
  },
})
