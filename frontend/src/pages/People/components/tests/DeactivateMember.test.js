import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import DeactivateMember from "../DeactivateMember";

describe("Testing CreateOrgModal", () => {
  const middlewares = [thunk];
  const initialState = {};
  const mockStore = configureMockStore(middlewares);
  let store, wrapper;
  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = render(
      <MemoryRouter>
        <Provider store={store}>
          <DeactivateMember
            open={true}
            onClose={() => jest.fn()}
            id="test-id"
            userType="active"
            page={1}
            paginationSize={10}
          />
        </Provider>
      </MemoryRouter>
    );
  });

  afterEach(cleanup);

  test("testing deactivate people", () => {
    const deactivateBtn = screen.getByRole("button", {
      name: /Yes, Deactivate/i,
    });
    fireEvent.click(deactivateBtn);
  });
  test("testing deactivate people", () => {
    const deactivateBtn = screen.getByRole("button", { name: /No, Wait/i });
    fireEvent.click(deactivateBtn);
  });

  test("close button", () => {
    const button = screen.getByRole("button", { name: "Close" });
    fireEvent.click(button);
  });
});
