import React from "react"
import { render, fireEvent } from "@testing-library/react-native"
import Cell from "./Cell"

describe("Cell", () => {
  it("renders the correct text based on the item prop", () => {
    const { getByText } = render(
      <Cell item="X" index={0} cellSize={50} makeMove={() => {}} />
    )
    expect(getByText("X")).toBeTruthy()
  })

  it("renders an empty text when item is null", () => {
    const { getByText } = render(
      <Cell item={null} index={0} cellSize={50} makeMove={() => {}} />
    )
    expect(getByText("")).toBeTruthy()
  })

  it("handles onPress event", () => {
    const makeMoveMock = jest.fn()
    const { getByTestId } = render(
      <Cell item="X" index={0} cellSize={50} makeMove={makeMoveMock} />
    )
    fireEvent.press(getByTestId("cell"))
    expect(makeMoveMock).toHaveBeenCalledTimes(1)
  })
})
