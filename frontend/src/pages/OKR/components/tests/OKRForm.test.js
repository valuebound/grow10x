/* eslint-disable testing-library/no-debugging-utils */
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";

import OKRForm from "../OKRForm";

describe("Testing OKRForm Compomnent", () => {
  const middlewares = [thunk];
  const initialState = {
    okr: {
      status: "idle",
    },
  };
  const mockStore = configureMockStore(middlewares);
  let store,
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
    ],
    row = [{ okrObjectiveId: "12345", okrObjective: "First" }];

  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(cleanup);

  it("renders OKRForm component", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <OKRForm
            editMode={true}
            isCompany={false}
            timePeriods={timePeriods}
            row={row}
            open={true}
            onClose={jest.fn()}
          />
        </Provider>
      </MemoryRouter>
    );
    fireEvent.submit(screen.getByRole("button", { name: /Cancel/i }));
    fireEvent.submit(screen.getByRole("button", { name: /Update OKR/i }));
    fireEvent.submit(screen.getByRole("heading", { name: /Update OKR/i }));
    fireEvent.submit(screen.getByRole("button", { name: /Close/i }));
  });
});
