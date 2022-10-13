import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";

import CheckinPopup from "../CheckinPopup";

describe("Testing CheckinPopup Compomnent", () => {
  const middlewares = [thunk];
  const initialState = {};
  const mockStore = configureMockStore(middlewares);
  let store,
    kr = {
      krsId: "test123",
      keyResult: "Done",
      krProgress: 60,
      status: "pending",
      start: 10,
      currentValue: 25,
      target: 100,
      isBoolean: true,
      unit: "%",
      krComments: [],
    },
    timePeriods = [
      {
        name: "dIV (2023-01-01 - 2023-03-31)",
        organization: "633a79058daa92bcb3649a58",
        startDate: "2023-01-01T00:00:00.000Z",
        endDate: "2023-03-31T00:00:00.000Z",
        isCurrent: false,
        isLocked: false,
        timestamp: "2022-10-10T07:45:36.000Z",
        isDeleted: false,
        createdBy: "633a79058daa92bcb3649a5a",
        _id: "63450e0c79384565939e54f8",
      },
    ];

  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(cleanup);

  it("renders CheckinPopup component", async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <CheckinPopup
            progress={50}
            kr={kr}
            onFinish={jest.fn()}
            isBoolean={true}
            viewMode={true}
            okrOwnerId={"test123"}
            timePeriods={timePeriods}
            quarter={"63450e0c79384565939e54f8"}
          />
        </Provider>
      </MemoryRouter>
    );
    fireEvent.change(screen.getByRole("switch", { name: /Completed/i }), { target: { value: 30 } });
  });

  it("renders OKRForm with Slider component", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <CheckinPopup
            progress={50}
            kr={kr}
            onFinish={jest.fn()}
            isBoolean={false}
            viewMode={true}
            okrOwnerId={"test123"}
            timePeriods={timePeriods}
            quarter={"63450e0c79384565939e54f8"}
          />
        </Provider>
      </MemoryRouter>
    );
    fireEvent.change(screen.getByRole("slider", { name: "" }), { target: { valueAsNumber: 40 } });
  });
});
