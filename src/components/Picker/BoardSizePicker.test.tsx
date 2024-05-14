import React from "react"
import { render, fireEvent } from "@testing-library/react-native"
import { BoardSize } from "../../hooks/useBoardState"
import BoardSizePicker from "./BoardSizePicker"

describe("BoardSizePicker", () => {
  const onValueChangeMock = jest.fn()

  it("handles onValueChange event for the picker", () => {
    const { getByTestId } = render(
      <BoardSizePicker
        boardSize={BoardSize.NORMAL}
        onValueChange={onValueChangeMock}
      />
    )
    const picker = getByTestId("picker")
    fireEvent(picker, "onChange", {
      nativeEvent: { selectedSegmentIndex: 1 },
    })
    expect(onValueChangeMock).toHaveBeenCalledWith(BoardSize.LARGE)
  })
})
