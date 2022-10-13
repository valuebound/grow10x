import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import NewNotifications from "../Notifications";

describe("Testing Notifications page", () => {
  const middlewares = [thunk];
  const initialState = {
    notification: {
      data: [
        {
          settings: {
            weeklySummary: {
              timeZone: "India Standard Time (UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi",
              day: "MONDAY",
              time: "10:00",
            },
            reminders: {
              timeZone: "India Standard Time (UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi",
              day: "SUNDAY",
              time: "10:00",
            },
          },
          _id: "633a79058daa92bcb3649a58",
          orgName: "Narayan Dubey",
          orgUsername: "narayan dubey",
          adminName: "Narayan Dubey",
          adminEmail: "narayan.d@valuebound.com",
          location: "Delhi",
          adminPhone: "9122329747",
          adminPhoneSecondary: null,
          orgType: "public",
          createdAt: "2022-10-03T05:54:13.000Z",
        },
      ],
      organisation: {},
    },
  };
  const mockStore = configureMockStore(middlewares);
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(cleanup);

  it("testing reminder", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <NewNotifications />
        </Provider>
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole("button", { name: /Save/i }));
  });

  it("testing Summary details", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <NewNotifications />
        </Provider>
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole("button", { name: /Save/i }));
    fireEvent.click(screen.getByRole("checkbox", { name: "Sun" }));
  });
});
