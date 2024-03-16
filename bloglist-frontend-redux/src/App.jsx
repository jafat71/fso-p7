import { useState, useRef, useEffect } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Blogs from "./Blogs";
import Notification from "./components/Notification";
import TogglableComponent from "./components/TogglableComponent";
import { useDispatch, useSelector } from 'react-redux'
import { setMessage } from "./reducers/notificationReducer";
import { likeBlog, appendBlog, setBlogs, quitBlog } from "./reducers/blogReducer";
import { setUser } from "./reducers/userReducer"
const App = () => {
  const dispatch = useDispatch()
  const message = useSelector(({ notifications, _ }) => {
    return notifications
  })
  const actualUser = useSelector(({ users }) => users)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [blogUser, setBloguser] = useState(null);
  const togglableRef = useRef();

  useEffect(() => {
    const user = window.localStorage.getItem("loggedNoteappUser");
    if (user) {
      //setBloguser(JSON.parse(window.localStorage.getItem("loggedNoteappUser")));
      dispatch(setUser(JSON.parse(window.localStorage.getItem("loggedNoteappUser"))))
    }
  }, []);


  useEffect(() => {
    if (actualUser) {
      blogService
        .getAll()
        .then((blogs) => dispatch(setBlogs(blogs)))
        .catch((error) => {
          dispatch(setMessage("Error Fetching Blogs (Error): " + error))
          setTimeout(() => {
            dispatch(setMessage(null))
          }, 3000);
        });
    }
  }, [actualUser]);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login(username, password);
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      //setBloguser(user);
      dispatch(setUser(user))
    } catch (error) {
      dispatch(setMessage("Login Failed: " + error))
      setTimeout(() => {
        dispatch(setMessage(null))
      }, 5000);
    }
  };

  const getForm = () => {
    return (
      <LoginForm
        handleLoginSubmit={handleLoginSubmit}
        setUsername={setUsername}
        setPassword={setPassword}
      ></LoginForm>
    );
  };

  const logout = () => {
    window.localStorage.removeItem("loggedNoteappUser");
    window.location.reload();
  };

  const getBlogs = () => {
    return (
      <>
        <Blogs
          username={actualUser.username}
          name={actualUser.name}
          id={actualUser.id}
          logout={logout}
        ></Blogs>
        <br></br>
        <TogglableComponent buttonLabel="ADD NEW NOTE" ref={togglableRef}>
          <BlogForm toggle={notificationReceived}></BlogForm>
        </TogglableComponent>
      </>
    );
  };

  const notificationReceived = () => togglableRef.current.toggleVisibility()

  return (
    <div>
      <Notification message={message}></Notification>
      {!actualUser ? getForm() : getBlogs()}
    </div>
  );
};

export default App;
