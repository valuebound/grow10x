import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import { Profile } from "..";

const profileData = {
  about: "HI this is about section",
  avatar: "https://avatars.dicebear.com/api/male/AtifKamal.svg?mood[]=happy&background=%23EE6C4DFF",
  currentOkrs: [],
  designation: "CEO",
  dob: "1999-05-05T04:35:34.324Z",
  email: "atif.k@valuebound.com",
  firstName: "Atif",
  gender: "Male",
  level: 0,
  location: "Delhi",
  organization: { _id: "633a75a08daa92bcb36499c6", orgName: "EnsuredIT" },
  phone: "8582924556",
  phoneSecondary: null,
  role: { _id: "6336c4be54dbcf1876fffc4a", role: "ADMIN" },
  surname: "Kamal",
  teams: [],
  userName: "ensuredit_ceo",
  whoReportsMe: [{ _id: "633a8405d27e23769c88c305", firstName: "Div", surname: "Yanshu" }],
  _id: "633a75a08daa92bcb36499c8",
  error: {},
  message: "User Data Fetched Successfull",
  status: "success",
};

describe("Testing Profile Module", () => {
  const middlewares = [thunk];
  const initialState = {
    profile: {
      data: profileData,
      status: "idle",
      errors: null,
    },
  };
  const mockStore = configureMockStore(middlewares);
  let store, wrapper;
  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = render(
      <MemoryRouter>
        <Provider store={store}>
          <Profile />
        </Provider>
      </MemoryRouter>
    );
  });

  afterEach(cleanup);

  it("testing Profile form", () => {
    expect(wrapper.getByText("Profile"));
  });

  it("testing Profile form", () => {
    const getSwitchButton = screen.getByRole("switch");
    fireEvent.click(getSwitchButton);
  });
});
