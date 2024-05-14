import { renderHook, act } from "@testing-library/react-native"
import { BoardSize } from "../useBoardState"
import { Player } from "../../types/general"
import { useGameLogic } from "../useGameLogic"

const GRID_SIZE = 9

// TODO: check for gameOver state
describe("useGameLogic", () => {
  /**
   * ? GENERAL GAME LOGIC
   */

  it("should initialize currentPlayer as Player.X", () => {
    const { result } = renderHook(() => useGameLogic({ boardSize: GRID_SIZE }))
    expect(result.current.currentPlayer).toBe(Player.X)
  })

  it("should update currentPlayer after a cell press", () => {
    const { result } = renderHook(() => useGameLogic({ boardSize: GRID_SIZE }))
    expect(result.current.currentPlayer).toBe(Player.X)

    act(() => {
      result.current.makeMove(0)
    })

    expect(result.current.currentPlayer).toBe(Player.O)
  })

  it("should update board after a cell press", () => {
    const { result } = renderHook(() => useGameLogic({ boardSize: GRID_SIZE }))
    const initialBoard = result.current.board

    act(() => {
      result.current.makeMove(0)
    })

    expect(result.current.board).not.toEqual(initialBoard)
    expect(result.current.board[0]).toStrictEqual(["X", null, null])
  })

  /**
   * ? WINNING CONDITIONS
   */
  it("should identify a horizontal win", () => {
    const { result } = renderHook(() => useGameLogic({ boardSize: GRID_SIZE }))
    const winningBoard = [
      ["X", "X", "X"],
      ["O", null, null],
      ["O", null, null],
    ]
    act(() => {
      result.current.setBoard(winningBoard)
    })
    expect(result.current.checkWinner(0)).toBe(Player.X)
  })

  it("should identify a vertical win", () => {
    const { result } = renderHook(() => useGameLogic({ boardSize: GRID_SIZE }))
    const winningBoard = [
      ["X", "O", null],
      ["X", "O", null],
      ["X", null, null],
    ]
    act(() => {
      result.current.setBoard(winningBoard)
    })
    expect(result.current.checkWinner(0)).toBe(Player.X)
  })

  it("should identify a diagonal win", () => {
    const { result } = renderHook(() => useGameLogic({ boardSize: GRID_SIZE }))
    const winningBoard = [
      ["X", "O", null],
      ["O", "X", null],
      [null, null, "X"],
    ]
    act(() => {
      result.current.setBoard(winningBoard)
    })
    expect(result.current.checkWinner(0)).toBe(Player.X)
  })

  it("should make a move and update the board", () => {
    const { result } = renderHook(() => useGameLogic({ boardSize: GRID_SIZE }))
    act(() => {
      result.current.makeMove(0)
    })
    expect(result.current.board[0][0]).toBe(Player.X) // Assuming "X" is the current player
  })

  it("should handle draw condition", () => {
    const { result } = renderHook(() => useGameLogic({ boardSize: GRID_SIZE }))
    const drawBoard = [
      ["X", "O", "X"],
      ["X", "O", "O"],
      ["O", "X", "X"],
    ]
    act(() => {
      result.current.setBoard(drawBoard)
    })
    expect(result.current.checkWinner(0)).toBe(null)
  })

  it("resets the game state when game is over with a winner", () => {
    const { result } = renderHook(() =>
      useGameLogic({ boardSize: BoardSize.NORMAL })
    )

    act(() => {
      result.current.setGameOver(true)
      result.current.setWinner(Player.X)
    })

    expect(result.current.gameOver).toBe(true)
    expect(result.current.winner).toBe(Player.X)

    act(() => {
      result.current.resetGame()
    })

    expect(result.current.gameOver).toBe(false)
    expect(result.current.winner).toBe(null)
    expect(result.current.currentPlayer).toBe(Player.X)
    expect(result.current.lastMoveIndex).toBe(-1)
  })
})
