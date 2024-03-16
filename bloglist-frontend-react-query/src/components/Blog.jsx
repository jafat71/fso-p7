import { useReducer, useState } from "react"
import blogService from '../services/blogs'
import PropTypes from 'prop-types'
import { notificationReducer } from "../NotificationReducer"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Link } from "react-router-dom"

// Mock for testing
const Blog = ({ dispatch,blog }) => {

  // const Blog = ({ blog,setNotificationMessage }) => {
  const show = { color: "white", backgroundColor: "blueviolet" }
  const hide = { color: "white", backgroundColor: "tomato" }
  const hideBlog = { display: 'none' }
  const showtxt = "show"
  const hidetxt = "hide"

  const [details, setDetails] = useState(false);
  const [style, setStyle] = useState(show);
  const [text, setText] = useState(showtxt);
  const [likes, setBlogLike] = useState(blog.likes);
  const queryClient = useQueryClient();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [blogView, setBlogView] = useState(blogStyle);

  const blogDeleteMutate = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: (blogDeleted) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.filter((b) => b.id !== blogDeleted.id))
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const blogLikeMutate = useMutation({
    mutationFn: blogService.likear,
    onSuccess: (updatedBlog) => {
      setBlogLike(updatedBlog.likes)
    },
    onError: (error) => {
      console.log(error)
      setBlogLike(blog.likes)

    }
  })


  const addLike = async () => {
      blogLikeMutate.mutate({ ...blog, likes: likes + 1 })
  }

  const handleDelete = async () => {
    if (window.confirm("Remove blog: " + blog.title + " by " + blog.author)) {

      try {
        blogDeleteMutate.mutate(blog.id)
        setBlogView(hideBlog)
        dispatch({ type: "ON", payload: 'Blog Deleted Succesfully ' })
        setTimeout(() => {
          dispatch({ type: "OFF" })
        }, 3000)
      } catch (error) {
        dispatch({ type: "ON", payload: 'Error on Delete: ' + error })
        setTimeout(() => {
          dispatch({ type: "OFF" })
        }, 3000)
      }
    }
  }

  return (
    <div className="m-1 text-white hover:text-rose-300 hover:border-l-4 border-rose-200 px-2 transition-all duration-150">
      <div className="blog-description">
        <p >
        <Link to={`blogs/${blog.id}`}>
        {blog.title} - {blog.author}
        </Link>
        {/* <button className="expand-button" style={style} onClick={() => {
          setDetails(!details)
          setStyle(details ? show : hide)
          setText(details ? showtxt : hidetxt)
        }}>{text} </button> */}
        </p>
        {
          details
          &&
          <div>
            <a href={blog.url} target=" _blank ">{blog.url}</a>
            <br></br>
            <p className="like-content">
              {likes}  <button className="like-button" onClick={() => addLike()} style={{ color: "white", backgroundColor: "green" }}> like </button>
            </p>
            <br></br>
            {blog.user.name}
            <br></br>

            <button className="delete-button" onClick={() => handleDelete()} style={{ color: "white", backgroundColor: "tomato" }}>delete</button>

          </div>
        }

      </div>

    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog