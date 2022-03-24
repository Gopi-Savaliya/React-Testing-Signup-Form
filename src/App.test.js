import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

const typeInForm = ({ email, password, confirmPassword }) => {
  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i,
  });
  const passwordInputElement = screen.getByLabelText(/^password/i);
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);

  if (email) {
    userEvent.type(emailInputElement, email);
  }
  if (password) {
    userEvent.type(passwordInputElement, password);
  }
  if (confirmPassword) {
    userEvent.type(confirmPasswordInputElement, confirmPassword);
  }

  return {
    emailInputElement,
    passwordInputElement,
    confirmPasswordInputElement,
  };
};

const clickOnSubmitBtn = () => {
  userEvent.click(
    screen.getByRole("button", {
      name: /submit/i,
    })
  );
};

describe("App", () => {
  beforeEach(() => {
    render(<App />);
  });
  
  test("input should be initially empty", () => {
    expect(screen.getByRole("textbox").value).toBe("");
    expect(screen.getByLabelText("Password").value).toBe("");
    expect(screen.getByLabelText(/confirm password/i).value).toBe("");
  });

  test("should be able to type an email", () => {
    const { emailInputElement } = typeInForm({ email: "abc@gmail.com" });
    expect(emailInputElement.value).toBe("abc@gmail.com");
  });

  test("should be able to type a password", () => {
    const { passwordInputElement } = typeInForm({ password: "Password12" });
    expect(passwordInputElement.value).toBe("Password12");
  });

  test("should be able to type a confirm password", () => {
    const { confirmPasswordInputElement } = typeInForm({
      confirmPassword: "Password12",
    });
    expect(confirmPasswordInputElement.value).toBe("Password12");
  });
  describe("Error Handling", () => {
    test("should display error message on invalid email", () => {
      expect(screen.queryByText(/email is invalid/i)).not.toBeInTheDocument();
      typeInForm({ email: "abcgmail.com" });
      clickOnSubmitBtn();
      expect(screen.queryByText(/email is invalid/i)).toBeInTheDocument();
    });
  
    test("should display error message on invalid password", () => {
      typeInForm({ email: "abc@gmail.com" });
      expect(
        screen.queryByText(
          /password must contain uppercase, lowercase, 2 digits and 3 or more characters/i
        )
      ).not.toBeInTheDocument();
      typeInForm({ password: "xyz" });
      clickOnSubmitBtn();
      expect(
        screen.queryByText(
          /password must contain uppercase, lowercase, 2 digits and 3 or more characters/i
        )
      ).toBeInTheDocument();
    });
  
    test(`should display error message if passwords doesn't match`, () => {
      typeInForm({
        email: "abc@gmail.com",
        password: "Password12",
      });
      expect(
        screen.queryByText(/the passwords doesn't match. Please try again/i)
      ).not.toBeInTheDocument();
      typeInForm({ confirmPassword: "xyz" });
      clickOnSubmitBtn();
      expect(
        screen.queryByText(/the passwords doesn't match. Please try again/i)
      ).toBeInTheDocument();
    });
  
    test("should display no error message if every input is valid", () => {
      typeInForm({
        email: "abc@gmail.com",
        password: "Password12",
        confirmPassword: "Password12",
      });
      clickOnSubmitBtn();
      expect(screen.queryByText(/email is invalid/i)).not.toBeInTheDocument();
      expect(
        screen.queryByText(
          /password must contain uppercase, lowercase, 2 digits and 3 or more characters/i
        )
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/the passwords doesn't match. Please try again/i)
      ).not.toBeInTheDocument();
    });
  })
});
