import { useDispatch, useSelector} from 'react-redux'
import { setVote } from '../reducers/anecdoteReducer'
import { notify  } from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const anecdotes = useSelector((state) => state.anecdotes)
    const filter = useSelector(state => state.filter.text)
    const dispatch = useDispatch()
    const notification = useSelector((state) => state.notification.text)
    const vote = (id, content) => {
        dispatch(setVote(id))
        dispatch(notify("Anecdote liked: " + content, 5))
    }

    const getSortedAnecdotes = ([...anecdotes],filter) => {
        anecdotes.sort((a, b) => b.votes - a.votes)
        const regexExp = new RegExp (`${filter}`,'i')
        const allRegex = new RegExp (`.*`)
        const regex = filter==="" ? allRegex : regexExp
        return (
            anecdotes.map(anecdote => 
                regex.test(anecdote.content) &&
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id, anecdote.content)} disabled={notification !== ""} >vote</button>
                    </div>
                </div>
            )
        )
    }


    return (
        <div>

            {
                getSortedAnecdotes(anecdotes,filter)
            }
        </div>
    );
}

export default AnecdoteList;
