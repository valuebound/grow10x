import { cleanup, render, screen,fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import ChangePassword from "../ChangePassword";

describe("Testing Change Password", () => {
  const middlewares = [thunk];
  const initialState = {
    setting: {
      status: "idle",
      error: null,
      passwordChanged: false,
    },
  };
  const mockStore = configureMockStore(middlewares);
  let store, wrapper;
  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = render(
      <MemoryRouter>
        <Provider store={store}>
          <ChangePassword />
        </Provider>
      </MemoryRouter>
    );
  });

  afterEach(cleanup);

  it("should give error new and confirm should same on submit the updated password", () => {
    const oldPassword = "123456";
    const newPassword = "654326";
    const confirmNewPassword = "654321";
    fireEvent.change(screen.getByLabelText(/Old Password/i), {
      target: { value: oldPassword },
    });
    fireEvent.change(screen.getByLabelText(/New Password/i), {
      target: { value: newPassword },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: confirmNewPassword },
    });
    fireEvent.click(screen.getByText("Update Password"));
  });

  it("should submit the updated password", () => {
    const oldPassword = "123456";
    const newPassword = "654321";
    const confirmNewPassword = "654321";
    fireEvent.change(screen.getByLabelText(/Old Password/i), {
      target: { value: oldPassword },
    });
    fireEvent.change(screen.getByLabelText(/New Password/i), {
      target: { value: newPassword },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: confirmNewPassword },
    });
    fireEvent.click(screen.getByText("Update Password"));
  });
});
