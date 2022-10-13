import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import ActivateMember from "../ActivateMember";

describe("Testing CreateOrgModal", () => {
  const middlewares = [thunk];
  const initialState = {};
  const mockStore = configureMockStore(middlewares);
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
    render(
      <MemoryRouter>
        <Provider store={store}>
          <ActivateMember
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

  test("testing activate people", () => {
    const activateBtn = screen.getByRole("button", {
      name: /Yes, activate/i,
    });
    fireEvent.click(activateBtn);
  });
  test("testing activate people wait btn", () => {
    const activateBtn = screen.getByRole("button", { name: /No, Wait/i });
    fireEvent.click(activateBtn);
  });

  test("close button", () => {
    const button = screen.getByRole("button", { name: "Close" });
    fireEvent.click(button);
  });
});
