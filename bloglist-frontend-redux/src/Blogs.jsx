import { useSelector } from "react-redux";
import Blog from "./components/Blog";
import { useEffect, useState } from "react";

const Blogs = ({
  username,
  name,
  id,
  logout
}) => {

  const blogs = useSelector(({ blogs }) => blogs);
  const [userSortedBlogs, setUserSortedBlogs] = useState([]);

  useEffect(() => {
    const sortedBlogs = blogs
      .filter((blog) => blog.user.id === id)
      .sort((a, b) => b.likes - a.likes);
    setUserSortedBlogs(sortedBlogs);
  }, [blogs, id]);



  return (
    <div>
      <h1>Blogs</h1>
      <p>
        {name} ({username}) logged in{" "}
        <button
          onClick={logout}
          style={{ color: "white", backgroundColor: "tomato" }}
        >
          LOG OUT
        </button>{" "}
      </p>

      <br></br>
      <div>
        {userSortedBlogs.map((blog) => {
          return (
            <div className="blogListMapped" key={blog.id}>
              <Blog
                blog={blog}
              ></Blog>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Blogs;
