import {
  cleanup,
  render,
  screen,
  fireEvent,
} from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import Otp from "../OtpModal";

describe("Testing Otp Modal", () => {
  const middlewares = [thunk];
  const initialState = {
    forgotPassword: {
      status: "idle",
      error: null,
      userId: "123",
    },
  };
  const mockStore = configureMockStore(middlewares);
  let store, wrapper;
  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = render(
      <MemoryRouter>
        <Provider store={store}>
          <Otp
            otpModalOpen={true}
            setOtpModalOpen={() => jest.fn()}
            email="test@test.com"
          />
        </Provider>
      </MemoryRouter>
    );
  });

  afterEach(cleanup);

  it("cancel test", () => {
    fireEvent.click(screen.getByText(/This is not my email/i));
  });

  it("resent test", () => {
    fireEvent.click(screen.getByText(/Resend/i));
  });

  it("should submit the otp", () => {
    const opt = 1234;
    fireEvent.change(screen.getByPlaceholderText(/Enter your otp/i), {
      target: { value: opt },
    });
    fireEvent.click(screen.getByText("Submit"));
  });
});
