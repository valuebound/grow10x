import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import OrgTree from "../OrgTree";

describe("Testing OrgChartUsingDiv Compomnent", () => {
  const middlewares = [thunk];
  const initialState = {
    people: {
      orgTreeData: [
        {
          title: "parent 1",
          key: "0-0",
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

  it("renders OrgChartUsingDiv component", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <OrgTree />
        </Provider>
      </MemoryRouter>
    );
  });
});
