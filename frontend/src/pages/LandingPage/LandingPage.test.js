import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

import LandingPage from "./LandingPage";

const env = process.env.REACT_APP_ENV;
const { config } = require(`../../config/${env}.config`);

it("Renders the landing page", () => {
  render(
    <MemoryRouter>
      <LandingPage />
    </MemoryRouter>
  );

  expect(screen.getByText("Welcome to Grow10x!")).toBeInTheDocument();
  expect(screen.getByText("Get Started")).toBeInTheDocument();
});

it("Testing get started route", () => {
  render(
    <MemoryRouter>
      <LandingPage />
    </MemoryRouter>
  );
  expect(screen.getByText("Get Started").closest("a").href).toEqual(`${config.CLIENT_URL}/login`);
});
