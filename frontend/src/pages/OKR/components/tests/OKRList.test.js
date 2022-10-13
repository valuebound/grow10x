import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";

import OKRList from "../OKRList";

describe("Testing OKRList Compomnent", () => {
  const middlewares = [thunk];
  const initialState = {
    okr: {
      data: {
        okrs: [
          {
            okrOwner: { _id: "test123", avatar: "avatar" },
            okrObjectiveId: "test123",
            quarter: 3,
            okrProgress: 50,
            okrStatus: "done",
            krs: [
              {
                krComments: [{ text: "123Comment" }],
                krsId: "test123",
                keyResult: "First",
                unit: "%",
                currentValue: 50,
              },
            ],
          },
        ],
      },
      companyData: {
        okrs: [
          {
            okrOwner: { _id: "test123", avatar: "avatar" },
            okrObjectiveId: "test123",
            quarter: "63450e0c79384565939e54f8",
            okrProgress: "50",
            okrStatus: "done",
            krs: [
              {
                krComments: [{ text: "123Comment" }],
                krsId: "test123",
                keyResult: "First",
                unit: "%",
                currentValue: 60,
              },
            ],
          },
        ],
      },
      status: "idle",
    },
    timePeriod: {
      data: [
        {
          name: "dIV (2023-01-01 - 2023-03-31)",
          organization: "633a79058daa92bcb3649a58",
          startDate: "2023-01-01T00:00:00.000Z",
          endDate: "2023-03-31T00:00:00.000Z",
          isCurrent: true,
          isLocked: true,
          timestamp: "2022-10-10T07:45:36.000Z",
          isDeleted: false,
          createdBy: "633a79058daa92bcb3649a5a",
          _id: "63450e0c79384565939e54f8",
        },
      ],
      status: "idle",
    },
  };
  const mockStore = configureMockStore(middlewares);
  let store,
    OKR_TYPE = {
      Individual: "individual",
      CompanyWide: "company",
    };

  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(cleanup);

  it("renders OKRList component", async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <OKRList okrType={OKR_TYPE.CompanyWide} showHeader={true} owner={"5sad5sad5asd4"} />
        </Provider>
      </MemoryRouter>
    );
    fireEvent.change(screen.getByRole("combobox", { name: "" }), { target: { value: "63450e0c79384565939e54f8" } });
    fireEvent.click(screen.getByRole("img", { name: "more" }));
    fireEvent.click(screen.getByRole("listbox", { name: "" }));
    fireEvent.click(screen.getByRole("option", { name: "63450e0c79384565939e54f8" }));
    fireEvent.click(screen.getByRole("img", { name: "lock" }));
    fireEvent.click(screen.getByRole("button", { name: /Create OKR/i }));
  });

  it("renders OKRList component with alternate props", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <OKRList okrType={OKR_TYPE.Individual} showHeader={false} owner={"5sad5sad5asd4"} />
        </Provider>
      </MemoryRouter>
    );
  });
});
