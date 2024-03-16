
import axios from 'axios'

const baseURL = " http://localhost:3001/anecdotes"

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
    const response = await axios.get(baseURL)
    return response.data
}

const createNew = async (content) => {
    const newAnecdote = {
        content,
        id: getId(),
        votes: 0
    }
    const response = await axios.post(baseURL,newAnecdote)
    return response.data
}

const vote = async(id) => {
    const responseGet = await axios.get(baseURL+"/"+id)
    const votedAnecdote = responseGet.data
    const updatedAnecdote = {
        ...votedAnecdote,
        votes: votedAnecdote.votes + 1
    }
    const response = await axios.put(baseURL+"/"+id,updatedAnecdote)
    return response.data
}

export default {
    getAll,
    createNew,
    vote
}