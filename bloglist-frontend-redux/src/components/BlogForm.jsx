import { useState, forwardRef, useImperativeHandle } from "react";
import { useDispatch } from "react-redux";
import blogService from "../services/blogs";
import { setMessage } from "../reducers/notificationReducer";
import { likeBlog, appendBlog, setBlogs, } from "../reducers/blogReducer";

const BlogForm = forwardRef(({ toggle }, ref) => {

  const dispatch = useDispatch()
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const formatateBlog = async (event) => {
    event.preventDefault();
    const newBlog = {
      title,
      author,
      url,
    };
    createNewBlog(newBlog);
  };

  const createNewBlog = async (blogObject) => {
    try {
      const addedBlog = await blogService.createBlog(blogObject);
      if (addedBlog) {
        dispatch(setMessage("New Blog Created: " +
          addedBlog.title +
          " by " +
          addedBlog.author +
          " added."))
        dispatch(appendBlog(addedBlog));
        toggle()
      }
    } catch (error) {
      dispatch(setMessage("Error Creating Blog: " + error))
    } finally {
      setTitle("")
      setAuthor("")
      setUrl("")
      setTimeout(() => {
        dispatch(setMessage(null))
        window.location.reload()
      }, 2000);
    }
  };

  return (
    <>
      <br></br>
      <h1>Create New Blog</h1>
      <form
        onSubmit={formatateBlog}
        style={{
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
        }}
      >
        <p>
          <label htmlFor="title" name="title">
            title:
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="blog title"
            onChange={(event) => setTitle(event.target.value)}
            required
          ></input>
        </p>
        <p>
          <label htmlFor="author" name="author">
            author:
          </label>
          <input
            id="author"
            name="author"
            type="text"
            placeholder="blog author"
            onChange={(event) => setAuthor(event.target.value)}
            required
          ></input>
        </p>
        <p>
          <label htmlFor="url" name="url">
            url:
          </label>
          <input
            id="url"
            name="url"
            type="url"
            placeholder="blog url"
            onChange={(event) => setUrl(event.target.value)}
            required
          ></input>
        </p>

        <br></br>
        <br></br>

        <button
          type="submit"
          className="create-button"
          style={{ color: "white", backgroundColor: "green" }}
        >
          create
        </button>
      </form>
    </>
  );
});

BlogForm.displayName = "BlogForm";

export default BlogForm;
