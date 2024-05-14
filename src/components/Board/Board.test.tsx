import React from "react"
import { render, fireEvent } from "@testing-library/react-native"
import Board from "./Board"

describe("Board", () => {
  it("initializes a two-dimensional array with all null values", () => {
    const { getAllByTestId } = render(<Board />)
    const cells = getAllByTestId("cell")
    expect(cells.length).toBe(9)
  })

  it("updates cell value on press", () => {
    const { getAllByTestId, getByText } = render(<Board />)
    const cells = getAllByTestId("cell")
    fireEvent.press(cells[0])
    expect(getByText("X")).toBeTruthy()
  })

  it("toggles current player on cell press", () => {
    const { getAllByTestId, getByText } = render(<Board />)
    const cells = getAllByTestId("cell")
    fireEvent.press(cells[0])
    expect(getByText("X")).toBeTruthy()
    fireEvent.press(cells[1])
    expect(getByText("O")).toBeTruthy()
  })

  it("does not change cell value if already taken", () => {
    const { getAllByTestId, getByText } = render(<Board />)
    const cells = getAllByTestId("cell")
    fireEvent.press(cells[0])
    expect(getByText("X")).toBeTruthy()
    fireEvent.press(cells[0])
    expect(getByText("X")).toBeTruthy()
  })
})
