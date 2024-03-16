import { useEffect, useState } from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../reducers/notificationReducer";
import { likeBlog, appendBlog, setBlogs, quitBlog } from "../reducers/blogReducer"
// Mock for testing
const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const show = { color: "white", backgroundColor: "blueviolet" };
  const hide = { color: "white", backgroundColor: "tomato" };
  const hideBlog = { display: "none" };
  const showtxt = "show";
  const hidetxt = "hide";

  const [details, setDetails] = useState(false);
  const [style, setStyle] = useState(show);
  const [text, setText] = useState(showtxt);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [blogView, setBlogView] = useState(blogStyle);

  const addLike = async () => {
    try {
      const updatedBlog = await blogService.likear(
        { ...blog, likes: blog.likes + 1 },
        blog.id,
      );
      dispatch(likeBlog(updatedBlog.id))
    } catch (error) {
      console.log(error)
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Remove blog: " + blog.title + " by " + blog.author)) {
      try {
        await blogService.deleteBlog(blog.id);
        dispatch(quitBlog(blog.id))
        setBlogView(hideBlog);
        dispatch(setMessage("Blog Deleted Succesfully "))
        setTimeout(() => {
          dispatch(setMessage(null))
          //window.location.reload();
        }, 3000);
      } catch (error) {
        dispatch(setMessage("Error on Delete: " + error))
        setTimeout(() => {
          dispatch(setMessage(null))
        }, 3000);
      }
    }
  };

  return (
    <div style={blogView}>
      <div className="blog-description">
        <p>
          {blog.title} {blog.author}{" "}
          <button
            className="expand-button"
            style={style}
            onClick={() => {
              setDetails(!details);
              setStyle(details ? show : hide);
              setText(details ? showtxt : hidetxt);
            }}
          >
            {text}{" "}
          </button>
        </p>
        {details && (
          <div>
            <a href={blog.url} target=" _blank ">
              {blog.url}
            </a>
            <br></br>
            <p className="like-content">
              {blog.likes}{" "}
              <button
                className="like-button"
                onClick={() => addLike()}
                style={{ color: "white", backgroundColor: "green" }}
              >
                {" "}
                like{" "}
              </button>
            </p>
            <br></br>
            {blog.user.name}
            <br></br>

            <button
              className="delete-button"
              onClick={() => handleDelete()}
              style={{ color: "white", backgroundColor: "tomato" }}
            >
              delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired
};

export default Blog;
