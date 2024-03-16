import React, { useEffect, useState } from 'react'
import blogService from '../services/blogs'
import { useParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'


const BlogDetail = () => {
    const id = useParams().id
    const [blog, setBlog] = useState({})
    const [user, setUser] = useState("")
    const [comment, setComment] = useState("")
    const [comments, setComments] = useState([])
    const [likes, setBlogLike] = useState(0);

    useEffect(() => {
        blogService.getOne(id)
            .then(data => {
                setBlog(data)
                setBlogLike(data.likes)
                setUser(data.user.name)
                setComments(data.comments)
            })
            .catch(e => console.error(e))

    }, [])

    const blogLikeMutate = useMutation({
        mutationFn: blogService.likear,
        onSuccess: (updatedBlog) => {
            setBlogLike(updatedBlog.likes)
            setBlog(updatedBlog)

        },
        onError: (error) => {
            console.log(error)
            setBlogLike(blog.likes)

        }
    })

    const blogCommentMutate = useMutation({
        mutationFn: blogService.commentBlog,
        onSuccess: (updatedBlog) => {
            setComments(updatedBlog.comments)
            setBlog(updatedBlog)
        },
        onError: (error) => {
            console.log(error)
            setBlogLike(comments)
        }
    })


    const addLike = async () => {
        blogLikeMutate.mutate({ ...blog, likes: likes + 1 })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        blogCommentMutate.mutate({ ...blog, comments: blog.comments.concat(comment) })
        setComment("")
    }

    return (
        <div className='container max-w-6xl mx-auto px-6 py-4 flex flex-col items-center text-white'>
            <h2 className='text-5xl m-2'>{blog.title} by {blog.author}</h2>
            <a href={blog.url} target=" _blank " className='text-rose-300'>{blog.url}</a>
            <br></br>
            <p className="like-content">
                {likes} <button className="like-button bg-rose-300 text-black" onClick={() => addLike()}> like </button>
            </p>
            <br></br>
            <p className='font-thin text-2xl'>added by {user}</p>
            <br></br>

            <h3 className='text-2xl m-3'>Comments</h3>
            <form onSubmit={handleSubmit} className='flex flex-col items-center md:flex-row gap-2 md:gap-0'>
                <input
                    type="text"
                    placeholder='comment'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className='border-none outline-none p-1 text-black'
                    required
                    ></input>
                <button type='submit' className='p-1'>add comment</button>
            </form>
            <br></br>
            <div className='flex flex-col items-start'>
            {
                comments.map((comment, i) => (
                    <li key={i}>{comment}</li>
                ))
            }
            </div>

        </div>
    )
}

export default BlogDetail