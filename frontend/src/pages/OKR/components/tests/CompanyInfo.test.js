/* eslint-disable testing-library/no-debugging-utils */
import { cleanup, render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";

import CompanyInfo from "../CompanyInfo";

describe("Testing CompanyInfo Compomnent", () => {
  const middlewares = [thunk];
  const initialState = {
    okr: {
      status: "idle",
      aboutData: {
        companyLogo: "logo",
        orgName: "VB",
        companyBrief: "Desc",
        vision: "Grow",
        mission: "10x",
        coreValues: "Fly High",
      },
      companyData: {
        okrs: [
          {
            okrOwner: "test",
            okrObjectiveId: "test123",
            quarter: "3",
            okrProgress: "50",
            okrStatus: "done",
            krs: [
              { krComments: [{ text: "123Comment" }], krsId: "123", keyResult: "First", unit: "%", currentValue: 60 },
            ],
          },
        ],
      },
    },
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
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(cleanup);

  it("renders CompanyInfo component", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <CompanyInfo />
        </Provider>
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole("tab", { name: /About/i }));
    fireEvent.click(screen.getByRole("tab", { name: /OKR/i }));
    fireEvent.click(screen.getByRole("tabpanel", { name: /OKR/i }));
    fireEvent.change(screen.getByRole("combobox", { name: "" }), { target: { value: 1 } });
    fireEvent.click(screen.getByRole("button", { name: /Create OKR/i }));
  });
});
