import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";

import UpdateMember from "../UpdateMember";

describe("Testing UpdateMember Compomnent", () => {
  const middlewares = [thunk];
  const initialState = {
    people: {
      reportingMangerList: [
        { id: "test1", name: "reporter", designation: "manager" },
      ],
    },
  };
  const mockStore = configureMockStore(middlewares);
  let store,
    row = {
      _id: "test123",
      firstName: "test",
      surname: "user",
      designation: "QA",
      userName: "testuser",
      email: "test@user.com",
      reportingManager: { _id: "test12345" },
    };

  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(cleanup);

  it("renders UpdateMember component", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <UpdateMember
            open={true}
            onClose={jest.fn()}
            row={row}
            userType={"active"}
            page={1}
            paginationSize={5}
          />
        </Provider>
      </MemoryRouter>
    );
    act(() => {
      fireEvent.change(screen.getByLabelText("First Name"), {
        target: { value: "Tester" },
      });
      fireEvent.click(screen.getByRole("dialog", { name: "Update Member" }));
      fireEvent.click(screen.getByRole("button", { name: "Close" }));
      fireEvent.click(screen.getByRole("button", { name: "Update" }));
    });
  });

  it("renders UpdateMember component without field change", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <UpdateMember
            open={true}
            onClose={jest.fn()}
            row={row}
            userType={"active"}
            page={1}
            paginationSize={5}
          />
        </Provider>
      </MemoryRouter>
    );
    act(() => {
      fireEvent.click(screen.getByRole("dialog", { name: "Update Member" }));
      fireEvent.click(screen.getByRole("button", { name: "Close" }));
      fireEvent.click(screen.getByRole("button", { name: "Update" }));
    });
  });
});
