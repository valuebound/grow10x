import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";

import DeleteOKR from "../DeleteOKR";

describe("Testing DeleteOKR Compomnent", () => {
  const middlewares = [thunk];
  const initialState = {};
  const mockStore = configureMockStore(middlewares);
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(cleanup);

  it("renders DeleteOKR component", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <DeleteOKR id={"test123"} open={true} onClose={jest.fn()} onFinish={jest.fn()} />
        </Provider>
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole("button", { name: /Yes, Delete/i }));
    fireEvent.click(screen.getByRole("button", { name: /No, Cancel/i }));
  });
});
