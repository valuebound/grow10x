/* eslint-disable testing-library/no-debugging-utils */
import { cleanup, render } from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";

import AnimatedPage from "../AnimatedPage";
import AnimatedRoutes from "../AnimatedRoutes";
import AppSkeleton from "../AppSkeleton";
import CustomProgress from "../CustomProgress";

import Loading from "../Loading";
import Navbar from "../Navbar";
import PrivateRoute from "../PrivateRoute";

describe("Testing Compomnents Directory", () => {
  const middlewares = [thunk];
  const initialState = {};
  const mockStore = configureMockStore(middlewares);
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(() => {
    cleanup();
  });

  it("renders AnimatedPage component", () => {
    render(<AnimatedPage />);
  });

  it("renders AnimatedRoutes component", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <AnimatedRoutes />
        </Provider>
      </MemoryRouter>
    );
  });

  it("renders AppSkeleton with Super Admin component", () => {
    window.localStorage.setItem("okr_vb_user", JSON.stringify({ role: "SUPER_ADMIN" }));
    render(
      <MemoryRouter>
        <Provider store={store}>
          <AppSkeleton />
        </Provider>
      </MemoryRouter>
    );
  });
  it("renders AppSkeleton with User component", () => {
    window.localStorage.setItem("okr_vb_user", JSON.stringify({ role: "USER" }));
    render(
      <MemoryRouter>
        <Provider store={store}>
          <AppSkeleton />
        </Provider>
      </MemoryRouter>
    );
  });
  it("renders AppSkeleton with Admin component", () => {
    window.localStorage.setItem("okr_vb_user", JSON.stringify({ role: "ADMIN" }));
    render(
      <MemoryRouter>
        <Provider store={store}>
          <AppSkeleton />
        </Provider>
      </MemoryRouter>
    );
  });

  it("renders CustomProgress component", () => {
    render(<CustomProgress />);
  });

  it("renders Loading component", () => {
    render(<Loading />);
  });

  it("renders Navbar with role Super Admin component", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Navbar
            user={{
              role: "SUPER_ADMIN",
              firstName: "Admin",
              avatar: "https://test.com/",
            }}
          />
        </Provider>
      </MemoryRouter>
    );
  });
});
