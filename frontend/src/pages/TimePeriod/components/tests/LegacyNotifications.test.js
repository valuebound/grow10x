import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import Notifications from "../LegacyNotifications";

describe("Testing Legacy Notifications page", () => {
  const middlewares = [thunk];
  const initialState = {};
  const mockStore = configureMockStore(middlewares);
  let store,
    initialValue = {
      timeZone: "India Standard Time (UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi",
      day: "SUNDAY",
      time: "10:00",
    };

  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(cleanup);

  it("testing Individual Checkin reminder", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Notifications
            title={"Individual Check-in reminder"}
            subtitle={"(Sent to owners of the OKR)"}
            onSubmit={jest.fn()}
            showCheckBox={false}
            loading={false}
            initialValues={initialValue}
            onClose={jest.fn()}
          />
        </Provider>
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole("button", { name: /Save/i }));
  });

  it("testing Weekly Summary details", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Notifications
            title={"Individual Check-in reminder"}
            subtitle={"(Sent to owners of the OKR)"}
            onSubmit={jest.fn()}
            showCheckBox={false}
            loading={false}
            initialValues={initialValue}
            onClose={jest.fn()}
          />
        </Provider>
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole("button", { name: /Save/i }));
  });
});
