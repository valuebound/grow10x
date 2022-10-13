import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import { People } from "..";

const peopleData = {
  allMembers: [
    {
      avatar: "https://avatars.dicebear.com/api/male/JonSnow.svg?mood[]=happy&background=%23EE6C4DFF",
      designation: "Principal Engineer",
      email: "hafizaatifkamal@gmail.com",
      firstName: "Jon",
      isActive: true,
      okrStats: { overallProgress: 8, overallStatus: "behind" },
      reportingManager: {
        avatar: "https://avatars.dicebear.com/api/male/AtifKamal.svg?mood[]=happy&background=%23EE6C4DFF",
        firstName: "Atif",
        surname: "Kamal",
        _id: "633a75a08daa92bcb36499c8",
      },
      role: { _id: "6336c4be54dbcf1876fffc4d", role: "USER" },
      surname: "Snow",
      userName: "jon_snow",
      _id: "633af1ee52a8ef414c591d2d",
    },
    {
      okrStats: { overallProgress: 8, overallStatus: "onTrack" },
      role: { _id: "6336c4be54dbcf1876fffc4d", role: "ADMIN" },
    },
    {
      okrStats: { overallProgress: 8, overallStatus: "atRisk" },
      role: { _id: "6336c4be54dbcf1876fffc4d", role: "MANAGER" },
    },
    {
      okrStats: { overallProgress: 8, overallStatus: "done" },
      role: { _id: "6336c4be54dbcf1876fffc4d", role: "HR" },
    },
  ],
};

describe("Testing People Module", () => {
  const middlewares = [thunk];
  const initialState = {
    people: {
      data: peopleData,
      status: "idle",
      errors: null,
    },
    okr: {
      companyData: {},
      data: {
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
      data: [],
      status: "idle",
    },
  };
  const mockStore = configureMockStore(middlewares);
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
    render(
      <MemoryRouter>
        <Provider store={store}>
          <People />
        </Provider>
      </MemoryRouter>
    );
  });

  afterEach(cleanup);

  it("testing People tab", () => {
    fireEvent.click(screen.getByRole("tab", { name: "People (0)" }));
  });

  it("testing Organization tab", () => {
    fireEvent.click(screen.getByRole("tab", { name: "Organization" }));
  });

  it("testing People table", () => {
    fireEvent.click(screen.getByRole("table"), { target: { page: 1, pageSize: 10 } });
  });

  it("testing search input", () => {
    expect(screen.getByPlaceholderText("Type name to search")).toBeInTheDocument();
  });

  it("testing Search function", () => {
    const searchFunc = screen.getByPlaceholderText("Type name to search");
    fireEvent.change(searchFunc, {
      target: { value: "abcd" },
    });
  });

  it("testing buttons", () => {
    fireEvent.change(screen.getByRole("textbox", { name: "" }), { target: { value: "test" } });
    fireEvent.click(screen.getByRole("button", { name: "search" }));
    fireEvent.click(screen.getByRole("button", { name: "close-circle" }));
    fireEvent.click(screen.getByRole("button", { name: "left" }));
    fireEvent.click(screen.getByRole("button", { name: "right" }));
    fireEvent.click(screen.getByText(/OverAll Progress/i));
    fireEvent.click(screen.getByRole("img", { name: "JonSnow" }));
    fireEvent.click(screen.getByRole("cell", { name: "AtifKamal" }));
  });
});
