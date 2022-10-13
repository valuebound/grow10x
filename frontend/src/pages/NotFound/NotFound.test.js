import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import NotFound from "./NotFound";

describe("Testing NotFound Compomnent", () => {
  afterEach(cleanup);

  it("renders NotFound component", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    act(() => {
      fireEvent.click(screen.getByText("Back Home"));
    });
  });
});
