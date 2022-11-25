import { cleanup, render, screen, fireEvent,act } from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";

describe("Testing Forget Password", () => {
  const middlewares = [thunk];
  const initialState = {
    forgotPassword: {
        status: "idle",
        error: null,
        userId: ""
    },
  };
  const mockStore = configureMockStore(middlewares);
  let store, wrapper;
  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = render(
      <MemoryRouter>
        <Provider store={store}>
          <ForgotPassword />
        </Provider>
      </MemoryRouter>
    );
  });

  afterEach(cleanup);

  it("testing Email input", () => {
    expect(wrapper.getByLabelText("Email"));
  });
  
  it("should submit the email", () => {
    const email = "test@gmail.com";
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: email },
      });
      fireEvent.click(screen.getByText("Search"));
    });
});
