import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";

import OrgChartUsingDiv from "../OrgChart/components/OrgChartUsingDiv";

describe("Testing OrgChartUsingDiv Compomnent", () => {
  const middlewares = [thunk];
  const initialState = {
    people: {
      orgChartData: {
        id: "no data found",
        value: { name: "no data" },
        children: [
          {
            data: {
              id: "1",
              items: { overallProgress: 50, overallStatus: "on-track" },
              value: { name: "data-name", title: "data-title" },
            },
          },
        ],
      },
      status: "idle",
    },
  };
  const mockStore = configureMockStore(middlewares);
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(cleanup);

  it("renders OrgChartUsingDiv component", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <OrgChartUsingDiv activeTab={"Organization"} />
        </Provider>
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole("button", { name: "redo Reset" }));
  });
});
