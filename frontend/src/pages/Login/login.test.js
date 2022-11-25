import {
  cleanup,
  render,
  screen,
  fireEvent,
  act,
} from "@testing-library/react";
// import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";

describe("Testing Login", () => {
  const middlewares = [thunk];
  const initialState = {
    auth: {
      status: "idle",
      error: null,
      userDetails: {},
    },
  };
  const mockStore = configureMockStore(middlewares);
  let store, wrapper;
  beforeEach(() => {
    store = mockStore(initialState);
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => (okr_vb_user = { role: "USER" })),
        setItem: jest.fn(() => null),
      },
      writable: true,
    });
    wrapper = render(
      <MemoryRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </MemoryRouter>
    );
  });

  afterEach(cleanup);

  // it("testing left-half", () => {
  //   expect(wrapper.getByLabelText("Email"));
  // });

  // test("testing banner img", () => {
  //   expect(screen.getByTestId("left-half-space-img")).toHaveAttribute(
  //     "alt",
  //     "person entering door"
  //   );
  // });

  // test("testing left-half-img-title", () => {
  //   expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
  //     "Grow10x Login"
  //   );
  // });

  // test("testing left-half-img-subtitle", () => {
  //   expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
  //     "Sky rocket your employee's performance"
  //   );
  // });

  // test("testing logo img", () => {
  //   expect(screen.getByTestId("right-half-logo")).toHaveAttribute(
  //     "alt",
  //     "Grow10x"
  //   );
  // });

  // test("testing email input", () => {
  //   expect(screen.getByRole("textbox", { name: "Email" }));
  // });

  // test("testing password input", () => {
  //   expect(screen.getByRole("textbox", { type: "password" }));
  // });

  // test("testing sumit button", () => {
  //   expect(screen.getByRole("button", "Login"));
  // });

  // test("testing banner img", () => {
  //   expect(screen.getByTestId("login-styled-footer")).toHaveTextContent(
  //     "Made in India with"
  //   );
  // });

  it("should submit the username and password", () => {
    const password = "test";
    const email = "test@gmail.com";
    act(() => {
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: email },
      });
      fireEvent.change(screen.getByLabelText(/Password/i), {
        target: { value: password },
      });
      fireEvent.click(screen.getByText("Login"));
    });
  });
});
