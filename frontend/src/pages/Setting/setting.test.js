import {
  cleanup,
  render,
  screen,
} from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import { Setting } from "..";

describe("Testing Setting", () => {
  const middlewares = [thunk];
  const initialState = {
    setting: {
      status: "idle",
      error: null,
      passwordChanged: false,
    },
  };
  const mockStore = configureMockStore(middlewares);
  let store, wrapper;
  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = render(
      <MemoryRouter>
        <Provider store={store}>
          <Setting />
        </Provider>
      </MemoryRouter>
    );
  });

  afterEach(cleanup);

  it("testing setting", () => {
    expect(screen.getByText("Settings"));
  });


});
