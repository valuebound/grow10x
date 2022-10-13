import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";

import UploadMembers from "../UploadMembers";

describe("Testing UploadMembers Compomnent", () => {
  const middlewares = [thunk];
  const initialState = {};
  const mockStore = configureMockStore(middlewares);
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(cleanup);

  it("renders UploadMembers component", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <UploadMembers userType={"active"} />
        </Provider>
      </MemoryRouter>
    );
    let uploadButton = screen.getAllByRole("button", { name: "upload Upload Members" });
    fireEvent.click(uploadButton[0]);
    fireEvent.change(screen.getByRole("img", { name: "upload" }), { file: { status: "done" } });
    fireEvent.click(screen.getByLabelText(/upload/i));
  });
});
