import { useEffect, useReducer } from "react"
import useBoardState, { BoardSize } from "./useBoardState"
import { Player } from "../types/general"
import { gameReducer, initialState } from "../reducers/gameStateReducer"

interface GameLogicProps {
  boardSize: BoardSize
}

export const useGameLogic = ({ boardSize }: GameLogicProps) => {
  const { board, setBoard, resetBoard, updateBoardSize } = useBoardState({
    size: boardSize,
  })

  const [gameState, dispatch] = useReducer(gameReducer, initialState)

  // Check for win condition when a move is made (i.e. board structure changes).
  useEffect(() => {
    const lastIndex = gameState.lastMoveIndex
    if (lastIndex === -1) return

    const winner = checkWinner(lastIndex)
    const isBoardFull = board.every((row) => row.every((cell) => cell !== null))

    // DRAW
    if (isBoardFull && !winner) {
      dispatch({ type: "SET_GAME_OVER", payload: true })
      dispatch({ type: "SET_WINNER", payload: null })
    }

    if (winner) {
      dispatch({ type: "SET_GAME_OVER", payload: true })
      dispatch({ type: "SET_WINNER", payload: winner })
    }
  }, [board])

  const resetGame = () => {
    resetBoard()
    dispatch({ type: "RESET_GAME_STATE", payload: false })
  }

  const updateBoard = (row: number, col: number) => {
    setBoard((prevBoard) => {
      return prevBoard.map((currentRow, rowIndex) =>
        currentRow.map((cell, colIndex) =>
          rowIndex === row && colIndex === col ? gameState.currentPlayer : cell
        )
      )
    })
  }

  const updateCurrentPlayer = () => {
    dispatch({
      type: "SET_CURRENT_PLAYER",
      payload: gameState.currentPlayer === Player.X ? Player.O : Player.X,
    })
  }

  const updateLastMoveIndex = (index: number) => {
    dispatch({ type: "SET_LAST_MOVE_INDEX", payload: index })
  }

  const makeMove = (index: number) => {
    if (gameState.gameOver) return

    const numOfRows = board.length
    // get the current row and col based on the index
    const row = Math.floor(index / numOfRows)
    const col = index % numOfRows

    if (board[row][col] === null) {
      updateBoard(row, col)
      updateCurrentPlayer()
    }
    updateLastMoveIndex(index)
  }

  const checkWinner = (lastIndex: number): Player | null => {
    const numOfCols = board[0].length

    // calculate the presed row and col based on the lastMoveIndex
    const row = Math.floor(lastIndex / numOfCols)
    const col = lastIndex % numOfCols

    // Check row
    if (board[row].every((cell) => cell === board[row][col])) {
      return board[row][col]
    }

    // Check column
    if (board.every((currRow) => currRow[col] === board[row][col])) {
      return board[row][col]
    }

    const diagonals = [
      // top-left -> bottom-right
      board.map((row, i) => row[i]).every((cell) => cell === board[row][col]),
      // top-right -> bottom-left
      board
        .map((row, i) => row[numOfCols - 1 - i])
        .every((cell) => cell === board[row][col]),
    ]

    if (diagonals.some((isDiagonalWinner) => isDiagonalWinner)) {
      return board[row][col]
    }

    return null
  }

  return {
    board,
    setBoard,
    makeMove,
    currentPlayer: gameState.currentPlayer,
    updateBoardSize,
    checkWinner,
    gameOver: gameState.gameOver,
    setGameOver: (payload: boolean) =>
      dispatch({ type: "SET_GAME_OVER", payload }),
    resetGame,
    winner: gameState.winner,
    setWinner: (payload: Player | null) =>
      dispatch({ type: "SET_WINNER", payload }),
    lastMoveIndex: gameState.lastMoveIndex,
  }
}
