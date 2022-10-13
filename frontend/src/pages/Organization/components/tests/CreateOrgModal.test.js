import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import CreateOrgModal from "../CreateOrgModal";

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
          <CreateOrgModal visible={true} setVisible={() => jest.fn()} />
        </Provider>
      </MemoryRouter>
    );
  });

  afterEach(cleanup);
  test("testing org Name", () => {
    expect(screen.getByLabelText("Name"));
  });
  test("testing org Email", () => {
    expect(screen.getByLabelText("Email"));
  });
  test("testing org Location", () => {
    expect(screen.getByLabelText("Location"));
  });
  test("testing Admin First Name", () => {
    expect(screen.getByLabelText("First Name"));
  });
  test("testing Admin Last Name", () => {
    expect(screen.getByLabelText("Last Name"));
  });
  test("testing Admin Contact Number", () => {
    expect(screen.getByLabelText("Contact Number"));
  });

  test("testing create org form", () => {
    const data = {
      name: "testing Name",
      email: "testing@email.com",
      location: "testing Location",
      firstName: "first",
      lastName: "last",
      contact: 9658741537,
    };

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: data.name },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: data.email },
    });
    fireEvent.change(screen.getByLabelText("Location"), {
      target: { value: data.location },
    });
    fireEvent.change(screen.getByLabelText("First Name"), {
      target: { value: data.firstName },
    });
    fireEvent.change(screen.getByLabelText("Last Name"), {
      target: { value: data.lastName },
    });
    fireEvent.change(screen.getByLabelText("Contact Number"), {
      target: { value: data.contact },
    });
    fireEvent.click(screen.getByText("Submit"));
  });

  test("close button",()=>{
    const button = screen.getByRole('button', {name: 'Close'});
    fireEvent.click(button)
  })
});
