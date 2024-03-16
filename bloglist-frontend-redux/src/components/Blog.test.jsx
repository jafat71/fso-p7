import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";

describe("component displaying a blog", () => {
  test("renders the blogs title and author, but does not render its URL or number of likes by default.", () => {
    const blog = {
      title: "CSE",
      author: "EMELEC",
      url: "https://www.youtube.com/watch?v=lKum7GDQxOY",
    };

    const setNotificationMessageMock = jest.fn();

    const { container } = render(
      <Blog
        blog={blog}
        setNotificationMessage={setNotificationMessageMock}
      ></Blog>,
    );

    const element = container.querySelector(".blog-description");
    const likesButton = container.querySelector(".like-button");
    expect(element).toBeDefined();
    expect(element).toHaveTextContent("CSE");
    expect(element).toHaveTextContent("EMELEC");
    expect(element).not.toHaveTextContent(
      "https://www.youtube.com/watch?v=lKum7GDQxOY",
    );
    expect(likesButton).toBeNull();
  });

  test("blogs URL and number of likes are shown when the button controlling the shown details has been clicked.", async () => {
    const blog = {
      title: "CSE",
      author: "EMELEC",
      url: "https://www.youtube.com/watch?v=lKum7GDQxOY",
      user: {
        name: "John Doe",
      },
    };

    const setNotificationMessageMock = jest.fn();

    const { container } = render(
      <Blog
        blog={blog}
        setNotificationMessage={setNotificationMessageMock}
      ></Blog>,
    );

    const element = container.querySelector(".blog-description");
    const likesButton = container.querySelector(".like-button");
    expect(element).not.toHaveTextContent(
      "https://www.youtube.com/watch?v=lKum7GDQxOY",
    );
    expect(likesButton).toBeNull();

    const user = userEvent.setup();
    const button = screen.getByText("show");
    await user.click(button);

    expect(element).toHaveTextContent(
      "https://www.youtube.com/watch?v=lKum7GDQxOY",
    );
    expect(likesButton).toBeDefined();
  });

  test("blogs URL and number of likes are shown when the button controlling the shown details has been clicked.", async () => {
    const blog = {
      title: "CSE",
      author: "EMELEC",
      likes: 0,
      url: "https://www.youtube.com/watch?v=lKum7GDQxOY",
      user: {
        name: "John Doe",
      },
    };

    const setNotificationMessageMock = jest.fn();
    const addLikeMock = jest.fn();

    const { container } = render(
      <Blog
        blog={blog}
        setNotificationMessage={setNotificationMessageMock}
        addLike={addLikeMock}
      ></Blog>,
    );

    const likesButton = container.querySelector(".like-button");
    expect(likesButton).toBeNull();

    const user = userEvent.setup();
    const button = screen.getByText("show");

    await user.click(button);
    const likesButtonShown = container.querySelector(".like-button");

    await user.click(likesButtonShown);
    await user.click(likesButtonShown);

    expect(addLikeMock).toHaveBeenCalledTimes(2);
  });
});
