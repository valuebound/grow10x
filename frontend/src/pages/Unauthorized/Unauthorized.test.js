/* eslint-disable testing-library/no-debugging-utils */
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Unauthorized from "./Unauthorized";

const fakeLocalStorage = (function () {
  let store = {};

  return {
    getItem: function (key) {
      return store[key] || null;
    },
    setItem: function (key, value) {
      store[key] = value.toString();
    },
    removeItem: function (key) {
      delete store[key];
    },
    clear: function () {
      store = {};
    },
  };
})();

describe("Testing Unauthorized Compomnent", () => {
  beforeAll(() => {
    Object.defineProperty(window, "localStorage", {
      value: fakeLocalStorage,
    });
  });

  afterEach(cleanup);

  it("renders Unauthorized component", () => {
    render(
      <MemoryRouter>
        <Unauthorized />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole("button", { name: /Back Home/i }));
  });
  it("renders Unauthorized component with role", () => {
    window.localStorage.setItem("okr_vb_user", JSON.stringify({ role: "SUPER_ADMIN" }));
    render(
      <MemoryRouter>
        <Unauthorized />
      </MemoryRouter>
    );
    expect(JSON.parse(window.localStorage.getItem("okr_vb_user")).role).toEqual("SUPER_ADMIN");
    fireEvent.click(screen.getByRole("button", { name: /Back Home/i }));
  });
});
