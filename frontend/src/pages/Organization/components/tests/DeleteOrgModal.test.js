import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import DeleteOrgModal from "../DeleteOrgModal";

describe("Testing CreateOrgModal", () => {
  const middlewares = [thunk];
  const initialState = {
  };
  const mockStore = configureMockStore(middlewares);
  let store, wrapper;
  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = render(
      <MemoryRouter>
        <Provider store={store}>
          <DeleteOrgModal
            visible={true}
            setVisible={() => jest.fn()}
            record={{ orgName: "test org" }}
          />
        </Provider>
      </MemoryRouter>
    );
  });

  afterEach(cleanup);

  test("testing deactivate", () => {
    const deactivateBtn = screen.getByRole("button",{name:/Deactivate/i});
    fireEvent.click(deactivateBtn);
  });

  test("close button", () => {
    const button = screen.getByRole("button", { name: "Close" });
    fireEvent.click(button);
  });
});
