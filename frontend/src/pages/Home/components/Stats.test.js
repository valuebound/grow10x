import { cleanup, render } from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";

import Stats from "./Stats";

describe("Testing Stats Compomnent", () => {
  const middlewares = [thunk];
  const initialState = {};
  const mockStore = configureMockStore(middlewares);
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(cleanup);

  it("renders Stats component", () => {
    let data = { overallStatus: "" };
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Stats data={data} loading={false} />
        </Provider>
      </MemoryRouter>
    );
  });
});
