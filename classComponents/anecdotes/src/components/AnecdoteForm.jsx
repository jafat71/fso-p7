import { useDispatch, useSelector } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'
const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const notification = useSelector((state) => state.notification.text)

    const handleSubmit = async (event) => {

        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        try {
            dispatch(createAnecdote(content))
            dispatch(notify("Created Anecdote succesfully: " + content, 5))
        }catch(error){
            dispatch(notify(`Anecdote '${content}' could not be created. Error: ` + error, 5))
        }
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
                <div><input name="anecdote" type="text" placeholder='ADD NEW ANECDOTE...' required /></div>
                <button type='submit'  disabled={notification !== ""}>create</button>
            </form>
        </>

    )
}

export default AnecdoteForm

