import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import SetPassword from "./SetPassword";

describe("Testing Set-Password", () => {
  const middlewares = [thunk];
  const initialState = {
    setPassword: {
      passwordChanged: true,
    },
  };
  const mockStore = configureMockStore(middlewares);
  let store, wrapper;
  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = render(
      <MemoryRouter>
        <Provider store={store}>
          <SetPassword />
        </Provider>
      </MemoryRouter>
    );
  });

  afterEach(cleanup);

  test("testing banner img", () => {
    expect(screen.getByTestId("setPassword-banner-img")).toHaveAttribute(
      "alt",
      "person entering door"
    );
  });

  test("testing left-half-img-title", () => {
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Secure your password"
    );
  });

  test("testing left-half-img-subtitle", () => {
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "Create a strong password"
    );
  });

  test("testing Password ", () => {
    expect(wrapper.getByLabelText("New Password"));
  });

  test("testing Password ", () => {
    expect(wrapper.getByLabelText("Confirm Password"));
  });

  test("testing sumit button", () => {
    expect(screen.getByRole("button", "Set Password"));
  });

  it("should submit the new password and confirm password password", () => {
    const password = "test123";
    const confirmPassword = "test123";
    act(() => {
      fireEvent.change(screen.getByLabelText(/new password/i), {
        target: { value: confirmPassword },
      });
      fireEvent.change(screen.getByLabelText(/confirm Password/i), {
        target: { value: password },
      });
      fireEvent.click(screen.getByText("Set Password"));
    });
  });

  it("confirm password not match give error", () => {
    const password = "test123";
    const confirmPassword = "test12";
    act(() => {
      fireEvent.change(screen.getByLabelText(/new password/i), {
        target: { value: password },
      });
      fireEvent.change(screen.getByLabelText(/confirm Password/i), {
        target: { value: confirmPassword },
      });
    });
  });
});
