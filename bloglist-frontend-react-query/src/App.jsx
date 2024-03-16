import { useState, useRef, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Blogs from './Blogs'
import Notification from './components/Notification'
import TogglableComponent from './components/TogglableComponent'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Users from './components/Users'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import User from './components/User'
import Blog from './components/Blog'
import BlogDetail from './components/BlogDetail'
import {
  useBlogUserDispatch,
  useBlogUserValue,
  useNotificationDispatch,
  useNotificationValue
} from './CounterContext'
const App = () => {
  const notification = useNotificationValue()
  const dispatchNotification = useNotificationDispatch()
  const blogUser = useBlogUserValue()
  const dispatchUser = useBlogUserDispatch()
  const queryClient = useQueryClient();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //const [blogUser, setBloguser] = useState(null);
  const togglableRef = useRef();

  useEffect(() => {
    const user = window.localStorage.getItem('loggedNoteappUser')
    user && dispatchUser({ type: "ON", payload: JSON.parse(window.localStorage.getItem("loggedNoteappUser")) })
  }, [])

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: false,
  })

  const blogs = result.data || []
  if (blogs) () => dispatchNotification({ type: "OFF" })

  const handleLoginSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login(username, password)
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatchUser({ type: "ON", payload: JSON.parse(window.localStorage.getItem("loggedNoteappUser")) })
    } catch (error) {
      dispatchNotification({ type: "ON", payload: 'Login Failed: ' + error })
      setTimeout(() => {
        dispatchNotification({ type: "OFF" })
      }, 5000)
    }

  }

  const getForm = () => {
    return (
      <LoginForm handleLoginSubmit={handleLoginSubmit} setUsername={setUsername} setPassword={setPassword}></LoginForm>
    )
  }

  const logout = () => {
    window.localStorage.removeItem(
      'loggedNoteappUser'
    )
    window.location.reload();
  }

  const newBlogMutation = useMutation({
    mutationFn: blogService.createBlog,
    onSuccess: (newBlog) => {
      togglableRef.current.toggleVisibility()
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
      dispatchNotification({ type: "ON", payload: 'New Blog Created: ' + newBlog.title + " by " + newBlog.author + " added." })
      window.scrollTo(0, 0);
      setTimeout(() => {
        dispatchNotification({ type: "OFF" })
        window.location.reload()
      }, 1000)
    },
    onError: (error) => {
      togglableRef.current.toggleVisibility()
      dispatchNotification({ type: "ON", payload: 'Error Creating Blog: ' + error })
      window.scrollTo(0, 0);
      setTimeout(() => {
        dispatchNotification({ type: "OFF" })
      }, 1000)
    }
  })


  const getBlogs = () => {
    return (
      <>
        <h1 className='text-3xl text-white'>Blogs</h1>
        <Blogs dispatcher={dispatchNotification} blogs={blogs} id={blogUser.id}></Blogs>
        <br></br>
        <TogglableComponent buttonLabel='ADD NEW NOTE' ref={togglableRef}>
          <BlogForm muteBlogs={newBlogMutation}></BlogForm>
        </TogglableComponent>
      </>
    )
  }

  return (
    <div>
      <Router >
        {blogUser && <div className='flex justify-between w-full text-rose-300 p-2'>
          <div>
            <Link to="/" className='p-2 hover:text-white'>blogs</Link>
            <Link to="/users" className='p-2 hover:text-white'>users</Link>
          </div>
          <span className='flex items-center'><div className='hidden md:block'>{blogUser.name} ({blogUser.username}) logged in</div>
            <button onClick={logout} className='mx-1 px-2 border border-rose-300
            hover:bg-white hover:text-black transition-all duration-300'>LOG OUT</button>
          </span>
        </div>
        }
        <div className='container max-w-6xl mx-auto px-6 py-12 flex flex-col items-center' >
          <Notification message={notification}></Notification>
          <Routes>
            <Route path="/" element={
              !blogUser
                ? getForm()
                : getBlogs()
            } />
            <Route path="/users" element={
              blogUser
                ? <Users></Users>
                : getForm()
            } />
            <Route path="/users/:id" element={blogUser ? <User /> : getForm()} />
            <Route path="/blogs/:id" element={blogUser ? <BlogDetail /> : getForm()} />

          </Routes>
        </div>
      </Router>

    </div>

  )
}

export default App