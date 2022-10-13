import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import TimeCycleModal from "../Periods";

describe("Testing Periods Modal page", () => {
  const middlewares = [thunk];
  const initialState = {
    timePeriod: {
      data: [
        {
          name: "dIV (2023-01-01 - 2023-03-31)",
          organization: "633a79058daa92bcb3649a58",
          startDate: "2023-01-01T00:00:00.000Z",
          endDate: "2023-03-31T00:00:00.000Z",
          isCurrent: false,
          isLocked: false,
          timestamp: "2022-10-10T07:45:36.000Z",
          isDeleted: false,
          createdBy: "633a79058daa92bcb3649a5a",
          _id: "63450e0c79384565939e54f8",
        },
      ],
    },
  };
  const mockStore = configureMockStore(middlewares);
  let store,
    initialValue = {
      _id: "63450e0c79384565939e54f8",
      name: "q4 (2022-10-01 - 2022-12-31)",
      startDate: "2023-01-01T00:00:00.000Z",
      endDate: "2023-03-31T00:00:00.000Z",
    };

  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(cleanup);

  it("testing Update button", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <TimeCycleModal
            loading={false}
            visible={true}
            editMode={true}
            initialValues={initialValue}
            onClose={jest.fn()}
          />
        </Provider>
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole("button", { name: /Update/i }));
  });

  it("testing Create button", () => {
    cleanup();
    render(
      <MemoryRouter>
        <Provider store={store}>
          <TimeCycleModal loading={false} visible={true} editMode={false} initialValues={{}} onClose={jest.fn()} />
        </Provider>
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText("Name", { target: { value: "Test123" } }));
    fireEvent.change(screen.getByPlaceholderText("Start date", { target: { value: "2023-01-01T00:00:00.000Z" } }));
    fireEvent.change(screen.getByPlaceholderText("End date", { target: { value: "2023-03-31T00:00:00.000Z" } }));
    fireEvent.click(screen.getByRole("button", { name: /close/i }));
  });
});
