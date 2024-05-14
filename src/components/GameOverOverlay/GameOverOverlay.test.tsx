import React from "react"
import { render, fireEvent, renderHook } from "@testing-library/react-native"
import { GameOverOverlay } from "./GameOverOverlay"
import { Player } from "../../types/general"
import { useGameLogic } from "../../hooks/useGameLogic"
import { BoardSize } from "../../hooks/useBoardState"

describe("GameOverOverlay", () => {
  const playAgainMock = jest.fn()

  it("renders the overlay with the correct text for a draw", () => {
    const { getByText } = render(
      <GameOverOverlay winner={null} playAgain={playAgainMock} />
    )
    expect(getByText("It's a draw!")).toBeTruthy()
  })

  it("renders the overlay with the correct text for Player X win", () => {
    const { getByText } = render(
      <GameOverOverlay winner={Player.X} playAgain={playAgainMock} />
    )
    expect(getByText("Player X wins!")).toBeTruthy()
  })

  it("renders the overlay with the correct text for Player O win", () => {
    const { getByText } = render(
      <GameOverOverlay winner={Player.O} playAgain={playAgainMock} />
    )
    expect(getByText("Player O wins!")).toBeTruthy()
  })

  it("resets the game state on press", () => {
    const { result } = renderHook(() =>
      useGameLogic({ boardSize: BoardSize.NORMAL })
    )

    const { getByText } = render(
      <GameOverOverlay winner={Player.O} playAgain={playAgainMock} />
    )

    fireEvent.press(getByText("Play Again"))
    expect(result.current.gameOver).toBe(false)
    expect(result.current.winner).toBe(null)
    expect(result.current.currentPlayer).toBe(Player.X)
    expect(result.current.lastMoveIndex).toBe(-1)
  })
})
