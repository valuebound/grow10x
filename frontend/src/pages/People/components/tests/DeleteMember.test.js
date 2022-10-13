import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import DeleteMember from "../DeleteMember";

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
          <DeleteMember
            open={true}
            onClose={() => jest.fn()}
            id="test-id"
            userType="active"
          />
        </Provider>
      </MemoryRouter>
    )
   
  });

  afterEach(cleanup);

  test("testing deactivate people", () => {
    const deactivateBtn = screen.getByRole("button",{name:/Yes, Delete/i});
    fireEvent.click(deactivateBtn);
  });
  test("testing deactivate people", () => {
    const deactivateBtn = screen.getByRole("button",{name:/No, Wait/i});
    fireEvent.click(deactivateBtn);
  });

  
  test("close button", () => {
    const button = screen.getByRole("button", { name: "Close" });
    fireEvent.click(button);
    expect(button).not.toBe()
  });
});
