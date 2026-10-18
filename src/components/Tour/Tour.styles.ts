import { StyleSheet } from "react-native"
import { colors } from "../../themes/Dark"

export const tourStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 30,
    gap: 30,
    backgroundColor: colors.background,
  },
  content: {
    alignItems: "center",
    gap: 20,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
  },
  body: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
  warningText: {
    color: colors.warning,
    fontWeight: "700",
  },
  tip: {
    color: colors.spinner,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 8,
  },
  checkboxText: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.input.border,
  },
  dotActive: {
    backgroundColor: colors.text,
  },
  secondaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  secondaryText: {
    color: colors.text,
    fontSize: 16,
    paddingVertical: 8,
  },
  hidden: {
    opacity: 0,
  },
})
