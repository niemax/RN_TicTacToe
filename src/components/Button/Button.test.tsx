import React from "react"
import { render, fireEvent } from "@testing-library/react-native"
import { CustomButton } from "./Button"

describe("CustomButton", () => {
  const mockAction = jest.fn()

  it("renders the button with the correct title", () => {
    const { getByText } = render(
      <CustomButton title="Test Button" action={mockAction} />
    )
    expect(getByText("Test Button")).toBeTruthy()
  })

  it("calls the action function when pressed", () => {
    const { getByTestId } = render(
      <CustomButton title="Test Button" action={mockAction} />
    )
    fireEvent.press(getByTestId("button"))
    expect(mockAction).toHaveBeenCalledTimes(1)
  })

  it("renders the button with a background when shouldHaveBackground is true", () => {
    const { getByTestId } = render(
      <CustomButton
        title="Test Button"
        action={mockAction}
        shouldHaveBackground
      />
    )
    const button = getByTestId("button")
    expect(button.props.style.backgroundColor).toContainEqual(
      expect.any(String)
    )
  })

  it("renders the button without a background when shouldHaveBackground is false", () => {
    const { getByTestId } = render(
      <CustomButton
        title="Test Button"
        action={mockAction}
        shouldHaveBackground={false}
      />
    )
    const button = getByTestId("button")
    expect(button.props.style).not.toContainEqual(expect.any(String))
  })
})
