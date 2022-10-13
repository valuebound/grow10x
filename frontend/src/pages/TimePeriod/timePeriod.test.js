import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import TimePeriods from "./timePeriod";

describe("Testing TimePeriod home page", () => {
  const middlewares = [thunk];
  const initialState = {
    timePeriod: {
      data: [
        {
          _id: "633a795b8daa92bcb3649a9b",
          name: "q4s (2022-10-01 - 2022-12-31)",
          time: "10:00",
          organization: "633a79058daa92bcb3649a58",
          startDate: "2022-10-01T00:00:00.000Z",
          endDate: "2022-12-31T00:00:00.000Z",
          isCurrent: true,
          isLocked: false,
          timestamp: "2022-09-30T10:30:51.000Z",
          isDeleted: false,
          createdBy: {
            _id: "633a79058daa92bcb3649a5a",
            firstName: "Narayan",
            surname: "Dubey",
          },
        },
      ],
      status: "idle",
    },
    notification: {
      organisation: {
        settings: {
          reminders: { timeZone: "India Standard Time (UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi", time: "11:00" },
          weeklySummary: {
            timeZone: "India Standard Time (UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi",
            time: "10:00",
          },
        },
      },
    },
  };
  const mockStore = configureMockStore(middlewares);
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
    render(
      <MemoryRouter>
        <Provider store={store}>
          <TimePeriods />
        </Provider>
      </MemoryRouter>
    );
  });

  afterEach(cleanup);

  it("testing Add Time Period Button", () => {
    fireEvent.click(screen.getByRole("button", { name: /Add Time Period/i }));
  });

  it("testing Tab Switch", () => {
    fireEvent.click(screen.getByRole("tab", { name: /Time Period/i }));
    fireEvent.change(screen.getByRole("tab", { name: /Time Period/i }));
  });
  it("testing out Tables", () => {
    screen.getByRole("table");
  });

  it("testing out rows", () => {
    screen.getByRole("row", { name: /Name Start End Action/i });
  });

  it("testing out cols", () => {
    screen.getByRole("columnheader", { name: /Name/i });
    screen.getByRole("columnheader", { name: /Start/i });
    screen.getByRole("columnheader", { name: /End/i });
    screen.getByRole("columnheader", { name: /Action/i });
  });
  it("testing Notifications", () => {
    fireEvent.click(screen.getByRole("tab", { name: /Notifications/ }));
    fireEvent.submit(screen.getByText("Individual Check-in reminder"));
  });
});
