
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import usersService from '../services/user'

const User = () => {
    const id = useParams().id
    const [user, setUser] = useState({});
    const [blogs, setBlogs] = useState([])
    useEffect(() => {
        usersService.getOne(id)
            .then(data => {
                setUser(data)
                setBlogs([...data.blogs])
            })
            .catch(e => console.error(e))
    }, [])
    if (!user) {
        return null
    }
    return (
        <div className='flex flex-col text-white justify-center items-center'>
            <h1 className='text-3xl font-thin'>{user.name}</h1>
            {blogs.length === 0
                ?
                (
                    <p>No blogs added</p>
                )
                :
                (
                    <div className='flex flex-col items-center '>
                        <h4 className='text-gray-300'>added blogs</h4>
                        <ul className='flex flex-col items-center '>
                            {blogs.map(blog => (
                                <li key={blog.id}>{blog.title}</li>
                            ))}
                        </ul>
                    </div>
                )}
        </div>
    )
}

export default User