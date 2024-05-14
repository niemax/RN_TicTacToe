import { useEffect, useState } from "react"

export enum BoardSize {
  NORMAL = 9, // 3x3
  LARGE = 16, // 4x4
  XLARGE = 36, // 6x6
}

interface BoardStateProps {
  size: BoardSize
}

const useBoardState = ({ size = BoardSize.NORMAL }: BoardStateProps) => {
  const [board, setBoard] = useState(() => {
    const rows = Math.sqrt(size)
    const cols = Math.sqrt(size)
    return Array.from({ length: rows }, () => Array(cols).fill(null))
  })

  useEffect(() => {
    const newSize = size
    updateBoardSize(newSize)
  }, [size])

  const updateBoardSize = (newSize: BoardSize) => {
    const rows = Math.sqrt(newSize)
    const cols = Math.sqrt(newSize)
    setBoard(Array.from({ length: rows }, () => Array(cols).fill(null)))
  }

  const resetBoard = () => {
    const rows = Math.sqrt(size)
    const cols = Math.sqrt(size)
    setBoard(Array.from({ length: rows }, () => Array(cols).fill(null)))
  }

  return { board, setBoard, resetBoard, updateBoardSize }
}

export default useBoardState
