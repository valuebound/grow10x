import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import OKRProgress from "../OKRProgress";

describe("Testing OKRProgressModal", () => {
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
  let store;
  let row;

  beforeEach(() => {
    store = mockStore(initialState);
    row = {
      firstName: "test",
      surName: "testSurName",
      email: "test@valuebound.com",
      isActive: true,
      okrStats: {
        krAtRisk: 0,
        krBehind: 0,
        krDone: 2,
        krOnTrack: 1,
        objectiveAtRisk: 0,
        objectiveBehind: 0,
        objectiveDone: 1,
        objectiveOnTrack: 1,
        overallProgress: 94,
        overallStatus: "onTrack",
        totalKrs: 3,
        totalObjective: 2,
      },
      role: {
        role: "ADMIN",
        _id: "6336c4be54dbcf1223456781",
      },
      teams: [],
    };
    render(
      <MemoryRouter>
        <Provider store={store}>
          <OKRProgress open={true} onClose={() => jest.fn()} row={row} />
        </Provider>
      </MemoryRouter>
    );
  });

  afterEach(cleanup);

  test("Renders OKR progress modal", () => {
    const okr = screen.getByText(`${row.firstName}'s OKRs`);
    expect(okr).toBeInTheDocument();
  });

  test("close button", () => {
    const button = screen.getByRole("button", { name: "Close" });
    fireEvent.click(button);
  });
});
