import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";

import ChangePassword from "./ChangePassword";

describe("Testing ChangePassword Compomnent", () => {
  const middlewares = [thunk];
  const initialState = {
    auth: {
      status: "idle",
      error: "Error",
    },
  };
  const mockStore = configureMockStore(middlewares);
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(cleanup);

  it("renders ChangePassword component", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <ChangePassword />
        </Provider>
      </MemoryRouter>
    );
    let password = screen.getAllByLabelText(/password/i);
    act(() => {
      fireEvent.change(password[0], {
        target: { value: "abc" },
      });
      fireEvent.change(password[1], {
        target: { value: "abc" },
      });
      fireEvent.click(screen.getByText("Update Password"));
    });
  });
});
