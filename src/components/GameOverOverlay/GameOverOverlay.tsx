import React from "react"
import { View, Text, StyleSheet, Platform } from "react-native"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { Player } from "../../types/general"
import { CustomButton } from "../Button/Button"

interface GameOverOverlayProps {
  winner: Player | null
  playAgain: () => void
}

export const GameOverOverlay = ({
  winner,
  playAgain,
}: GameOverOverlayProps) => {
  const renderGameOverText = () => {
    switch (winner) {
      case null:
        return "It's a draw!"
      case Player.X:
        return `Player X wins!`
      case Player.O:
        return `Player O wins!`
    }
  }

  const icon =
    Platform.OS === "android" ? (
      <MaterialCommunityIcons name="refresh" size={30} color="black" />
    ) : (
      <Ionicons name="refresh-outline" size={30} color="black" />
    )

  return (
    <View style={styles.overlay}>
      <Text style={styles.overlayText}>{renderGameOverText()}</Text>
      <CustomButton
        icon={icon}
        title="Play Again"
        action={playAgain}
        shouldHaveBackground
      />
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  overlayText: {
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  playAgainButton: {
    backgroundColor: "green",
    padding: 20,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  playAgainText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
})
