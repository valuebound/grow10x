import { cleanup, render } from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";

import OKR from "./OKR";

describe("Testing OKR Compomnent", () => {
  const middlewares = [thunk];
  const initialState = {
    okr: {
      data: { okrs: [] },
      companyData: { okrs: [] },
      status: "idle",
    },
    timePeriod: {
      data: [
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
      status: "idle",
    },
  };
  const mockStore = configureMockStore(middlewares);
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(cleanup);

  it("renders OKR component", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <OKR />
        </Provider>
      </MemoryRouter>
    );
  });
});
