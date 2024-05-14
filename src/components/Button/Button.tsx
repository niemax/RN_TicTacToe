import React, { ReactNode } from "react"
import { Text, TouchableOpacity, StyleSheet } from "react-native"
import { COLORS } from "../../theme/colors"

interface CustomButtonProps {
  icon?: ReactNode
  title: string
  action: () => void
  shouldHaveBackground?: boolean
}

export const CustomButton = ({
  icon,
  title,
  action,
  shouldHaveBackground,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      style={shouldHaveBackground ? styles.button : styles.transparentButton}
      onPress={action}
      testID="button"
    >
      {icon ? icon : null}
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 20,
    backgroundColor: COLORS.greenOpaque,
    borderRadius: 50,
    borderColor: COLORS.green,
    borderWidth: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  transparentButton: {
    padding: 20,
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#000000",
    marginLeft: 4,
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
  },
})
