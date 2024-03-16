
import React, { useEffect, useState } from 'react'
import usersService from '../services/user'
import { Link } from 'react-router-dom'

const Users = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        usersService.getAll()
            .then(data => setUsers(data))
            .catch(e => console.log(e))
    }, [])

    return (
        <div className='flex flex-col text-white justify-center items-center'>
            <h1 className='text-3xl mb-2'>Users</h1>
            <table className='min-w-full divide-y divide-gray-200' >
                <thead className='font-bold'>
                    <tr>
                        <td>Users</td>
                        <td>Blogs created</td>
                    </tr>
                </thead>
                <tbody className='min-w-full divide-y divide-gray-200'>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className='text-rose-300 pr-2 hover:text-white transition duration-200'>
                                <Link to={`${user.id}`}>{user.name}</Link>
                            </td>
                            <td>{user.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}

export default Users
