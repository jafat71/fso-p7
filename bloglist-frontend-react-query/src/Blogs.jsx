import { useEffect, useState } from "react";
import Blog from "./components/Blog";

const Blogs = ({ dispatcher,blogs, id, setNotificationMessage }) => {
    const [userSortedBlogs, setUserSortedBlogs] = useState([]);

    useEffect(() => {
        const sortedBlogs = blogs
            .filter((blog) => blog.user.id === id)
            .sort((a, b) => b.likes - a.likes);
        setUserSortedBlogs(sortedBlogs);
    }, [blogs, id]);
    return (
        <div>
            <br></br>
            <div>
                {userSortedBlogs.map(blog => {
                    return (
                        <div className="blogListMapped" key={blog.id}>
                            <Blog dispatch={dispatcher} blog={blog} setNotificationMessage={setNotificationMessage}></Blog>
                        </div>
                    )
                }
                )}
            </div>

        </div>
    );
}

export default Blogs