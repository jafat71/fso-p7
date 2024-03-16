import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

describe("Test Blog Form component", () => {
  test(" should check, that the form calls the event handler it received as props with the right details when a new blog is created", async () => {
    const createBlogMock = jest.fn();

    const { container } = render(
      <BlogForm createNewBlog={createBlogMock}></BlogForm>,
    );

    const titleInput = container.querySelector("#title");
    const authorInput = container.querySelector("#author");
    const urlInput = container.querySelector("#url");
    const createButton = container.querySelector(".create-button");

    const user = userEvent.setup();
    await user.type(titleInput, "CSE");
    await user.type(authorInput, "Emelec");
    await user.type(urlInput, "http://localhost:8000");
    await user.click(createButton);

    expect(createBlogMock).toHaveBeenCalledWith({
      title: "CSE",
      author: "Emelec",
      url: "http://localhost:8000",
    });
  });
});
