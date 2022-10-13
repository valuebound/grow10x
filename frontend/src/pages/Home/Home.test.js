import { cleanup, render } from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";

import Home from "./Home";

describe("Testing Home Compomnent", () => {
  const middlewares = [thunk];
  const initialState = {
    dashboard: {
      data: {},
      status: "loading",
    },
    timePeriod: {
      data: [{ isCurrent: 1665394843536, name: "test", isLocked: "Yes", _id: "12345" }],
      status: "idle",
    },
  };
  const mockStore = configureMockStore(middlewares);
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(cleanup);

  it("renders home component", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Home />
        </Provider>
      </MemoryRouter>
    );
  });
});
