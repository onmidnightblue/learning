import { render, screen } from "@testing-library/react";
import Greeting from "./Greeting";
import userEvent from "@testing-library/user-event";

describe("Greeting component", () => {
  test("renders Hello World as a test", () => {
    // Arrange
    render(<Greeting />);

    // Act
    // ... nothing

    // Assert
    const helloWorldElement = screen.getByText("hello World", { exact: false });
    expect(helloWorldElement).toBeInTheDocument();
  });

  test("renders see you as a test", () => {
    // Arrange
    render(<Greeting />);

    // Act
    // ... nothing

    // Assert
    const seeyouElement = screen.getByText("see you", { exact: false });
    expect(seeyouElement).toBeInTheDocument();
  });

  // 버튼을 클릭했을 때 'changed' 텍스트가 보여야 하는 경우 테스트
  test("button was clicked", () => {
    // Arrange
    render(<Greeting />);

    // Act
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

    // Assert
    const changedElement = screen.getByText("changed!");
    expect(changedElement).toBeInTheDocument();
  });

  // 버튼을 클릭했을 때 'see you' 텍스트가 보이지 않아야 하는 경우 테스트
  test("does not render 'see you' button was clicked", () => {
    // Arrange
    render(<Greeting />);

    // Act
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

    // Assert
    const changedElement = screen.queryByText("see you", { exact: false });
    expect(changedElement).toBeNull();
  });
});
