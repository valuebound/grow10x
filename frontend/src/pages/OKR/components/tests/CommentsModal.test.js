import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";

import CommentsModal from "../CommentsModal";

describe("Testing CommentsModal Compomnent", () => {
  const middlewares = [thunk];
  const initialState = {
    okr: {
      status: "loading",
      activityFeed: {
        activity: [
          {
            operation: "KR_CREATED",
            timestamp: "2022-10-10T07:45:36.000Z",
            createdBy: { firstName: "Test", surname: "User", avatar: "https://test.com/" },
          },
          {
            operation: "KR_PROGRESS_UPDATED_COMMENTED",
            timestamp: "2022-10-10T07:45:36.000Z",
            createdBy: { firstName: "Test", surname: "User", avatar: "https://test.com/" },
          },
          {
            operation: "COMMENTED",
            timestamp: "2022-10-10T07:45:36.000Z",
            createdBy: { firstName: "Test", surname: "User", avatar: "https://test.com/" },
          },
          {
            operation: "KR_UPDATED",
            timestamp: "2022-10-10T07:45:36.000Z",
            createdBy: { firstName: "Test", surname: "User", avatar: "https://test.com/" },
          },
          {
            operation: "OKR_UPDATED",
            timestamp: "2022-10-10T07:45:36.000Z",
            createdBy: { firstName: "Test", surname: "User", avatar: "https://test.com/" },
          },
          {
            operation: "default",
            timestamp: "2022-10-10T07:45:36.000Z",
            createdBy: { firstName: "Test", surname: "User", avatar: "https://test.com/" },
          },
        ],
      },
    },
  };
  const mockStore = configureMockStore(middlewares);
  let store,
    kr = {
      krsId: "test123",
      keyResult: "Done",
      krProgress: 60,
      status: "pending",
      start: 10,
      currentValue: 25,
      target: 100,
      isBoolean: true,
      unit: "%",
      krComments: [
        {
          text: "test",
          createdAt: "2022-10-10T07:45:36.000Z",
          commentedBy: { firstName: "Test", surname: "User", avatar: "https://test.com/" },
        },
      ],
    };

  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(cleanup);

  it("renders CommentsModal component", async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <CommentsModal open={true} kr={kr} onClose={jest.fn()} onFinish={jest.fn()} viewMode={true} />
        </Provider>
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole("button", { name: /Close/i }));
    fireEvent.click(screen.getByRole("img", { name: /Close/i }));
    fireEvent.click(screen.getByRole("tab", { name: /Comments/i }));
    fireEvent.click(screen.getByRole("tab", { name: /Activity Feed/i }));
    fireEvent.click(screen.getByRole("dialog", { name: /Done/i }));
  });
});
