
import { useState, forwardRef, useImperativeHandle, useReducer } from 'react'

const BlogForm = forwardRef(({ muteBlogs }, refs) => {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const createBlog = async (event) => {
        event.preventDefault()
        const newBlog = {
            title,
            author,
            url
        }
        muteBlogs.mutate({ ...newBlog })

    }

    useImperativeHandle(refs, () => {
        return {
            title,
            author
        }
    })

    return (
        <>
            <form onSubmit={createBlog} className='flex flex-col space-y-4 border-4 p-4 rounded-lg border-rose-300'>
                <h1 className='text-4xl text-white'>Create New Blog</h1>
                <p className='flex flex-row justify-between'>
                    <label htmlFor='title' name='title' className='text-xl font-thin text-white'>title</label>
                    <input id="title" name="title" type="text" placeholder='blog title' onChange={event => setTitle(event.target.value)} required
                        className='border-none outline-none rounded-sm p-1'
                    ></input>
                </p>
                <p className='flex flex-row justify-between' >
                    <label htmlFor='author' name='author' className='text-xl font-thin text-white'>author</label>
                    <input id="author" name="author" type="text" placeholder='blog author' onChange={event => setAuthor(event.target.value)} required
                        className='border-none outline-none rounded-sm p-1'
                    ></input>
                </p>
                <p className='flex flex-row justify-between'>
                    <label htmlFor='url' name='url' className='text-xl font-thin text-white'>url</label>
                    <input id="url" name="url" type="url" placeholder='blog url' onChange={event => setUrl(event.target.value)} required
                        className='border-none outline-none rounded-sm p-1'
                    ></input>
                </p>

                <button type="submit" className='create-button text-white bg-green-600'>create</button>
            </form>
        </>
    );
})

BlogForm.displayName = "BlogForm"

export default BlogForm