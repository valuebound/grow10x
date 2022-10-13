import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import MemberForm from "../MemberForm";

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
          <MemberForm
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

  test("testing add people no wait", () => {
    const cancelBtn = screen.getByRole("button", { name: /Cancel/i });
    fireEvent.click(cancelBtn);
  });

  test("testing add people close button", () => {
    const button = screen.getByRole("button", { name: "Close" });
    fireEvent.click(button);
    expect(button).not.toBe();
  });

  test("testing add people submit", () => {
    const data = {
      email: "test@test.com",
      firstName: "first",
      surName: "last",
    };

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: data.email },
    });
    fireEvent.change(screen.getByLabelText("First Name"), {
      target: { value: data.firstName },
    });
    fireEvent.change(screen.getByLabelText("Surname"), {
      target: { value: data.surName },
    });

    const submitBtn = screen.getByRole("button", { name: /Submit/i });
    fireEvent.click(submitBtn);
  });

  test("testing add another people ", () => {
    const addAnotherBtn = screen.getByRole("button", {
      name: /Add another member/i,
    });
    fireEvent.click(addAnotherBtn);

    const deleteFieldBtn = screen.getAllByRole("img", {
      name: /minus-circle/i,
    });
    fireEvent.click(deleteFieldBtn[0]);
  });
});
