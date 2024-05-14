import { act, renderHook } from "@testing-library/react-native"
import useBoardState from "../useBoardState"

describe("useBoardState", () => {
  const boardInitial = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]
  const mockBoard = [
    ["X", "O", "X"],
    ["O", "X", "O"],
    ["X", "O", "X"],
  ]

  const GRID_SIZE = 9

  it("should initialize board with 3x3 null values", () => {
    const { result } = renderHook(() => useBoardState({ size: GRID_SIZE }))
    expect(result.current.board).toEqual(boardInitial)
  })

  it("should reset the board to 3x3 null values", () => {
    const { result } = renderHook(() => useBoardState({ size: GRID_SIZE }))
    expect(result.current.board).toEqual(boardInitial)
    act(() => {
      result.current.setBoard(mockBoard)
    })
    expect(result.current.board).toEqual(mockBoard)

    act(() => {
      result.current.setBoard(boardInitial)
    })
    expect(result.current.board).toEqual(boardInitial)
  })
})
