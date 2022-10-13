import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import Organization from "./Organization";

describe("Testing Organization", () => {
  const middlewares = [thunk];
  const initialState = {
    organization: {
      value: 0,
      status: "idle",
      error: null,
      listOfOrg: [
        {
          adminEmail: "test@test.com",
          adminName: "test test",
          adminPhone: "9988776611",
          adminPhoneSecondary: null,
          createdAt: "2022-10-04T05:50:40.000Z",
          isDeleted: false,
          location: "test",
          orgName: "test Test",
          orgType: "public",
          orgUsername: "test test",
        },
      ],
    },
  };
  const mockStore = configureMockStore(middlewares);
  let store, wrapper;
  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = render(
      <MemoryRouter>
        <Provider store={store}>
          <Organization />
        </Provider>
      </MemoryRouter>
    );
  });

  afterEach(cleanup);

  test("testing add orgnization button", () => {
    // fireEvent.click(screen.getByText('Add Orgnization'));
    fireEvent.click(screen.getByTestId("add-org-btn"));
  });

  test("testing table", () => {
    expect(screen.getByRole("table"));
  });
});
