import React, { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Platform,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useGameLogic } from "../../hooks/useGameLogic"
import { BoardSize } from "../../hooks/useBoardState"
import { GameOverOverlay } from "../GameOverOverlay/GameOverOverlay"
import Cell from "../Cell/Cell"
import { CustomButton } from "../Button/Button"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import BoardSizePicker from "../Picker/BoardSizePicker"

const { width, height } = Dimensions.get("window")

const Board = () => {
  const [boardSize, setBoardSize] = useState<BoardSize>(BoardSize.NORMAL)
  const { board, makeMove, currentPlayer, gameOver, winner, resetGame } =
    useGameLogic({
      boardSize,
    })

  const numColumns = Math.floor(board.length)

  const handleBoardSizeChange = (newBoardSize: BoardSize) => {
    setBoardSize(newBoardSize)
  }

  const renderItem = ({ item, index }: { item: string; index: number }) => {
    const cellSize = width / numColumns
    return (
      <Cell
        item={item}
        index={index}
        cellSize={cellSize}
        makeMove={() => makeMove(index)}
      />
    )
  }

  const renderTurnText = () => {
    switch (gameOver) {
      case true:
        return `Game Over, Player ${currentPlayer} wins!`
      case false:
        return `Player ${currentPlayer}'s turn`
      default:
        return "Player X's turn"
    }
  }

  const renderGame = () => {
    const gameHasStarted = board?.some((row) =>
      row.some((cell) => cell !== null)
    )

    const icon =
      Platform.OS === "android" ? (
        <MaterialCommunityIcons name="refresh" size={30} color="black" />
      ) : (
        <Ionicons name="refresh-outline" size={30} color="black" />
      )

    return (
      board && (
        <View>
          {!gameOver ? (
            <Text style={styles.text}>{renderTurnText()}</Text>
          ) : null}
          <FlatList
            key={`${boardSize}-${numColumns}`}
            data={board.flat()}
            renderItem={renderItem}
            keyExtractor={(_, index) => index.toString()}
            numColumns={numColumns}
            scrollEnabled={false}
            ListFooterComponent={
              gameHasStarted ? (
                <View style={styles.actions}>
                  <CustomButton
                    icon={icon}
                    title="Reset Game"
                    action={resetGame}
                    shouldHaveBackground={false}
                  />
                </View>
              ) : (
                <BoardSizePicker
                  boardSize={boardSize}
                  onValueChange={handleBoardSizeChange}
                />
              )
            }
          />
        </View>
      )
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.gameArea}>
        {renderGame()}
        {gameOver ? (
          <GameOverOverlay winner={winner} playAgain={resetGame} />
        ) : null}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gameArea: {
    position: "relative",
    width: "100%",
    flexDirection: "column",
    marginTop: height * 0.09,
  },
  turnText: {
    fontSize: 32,
    fontWeight: "bold",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  actions: {
    marginTop: 20,
  },
})

export default Board
