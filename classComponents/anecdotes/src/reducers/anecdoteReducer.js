/* eslint-disable no-case-declarations */

import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

// export const vote = (id) => {
//   return {
//     type: "VOTE",
//     payload: {
//       id
//     }
//   }
// }

// export const addAnecdoteReducer = (content) => {
//   const anecdoteBody = asObject(content)
//   return {
//     type: "ADD_ANECDOTE",
//     payload: {
//       content: anecdoteBody.content,
//       id: anecdoteBody.id,
//       votes: anecdoteBody.votes
//     },
//   }
// }

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState : [],
  reducers: {
    vote: (state, action) => {
      const id = action.payload.id
      const findAnecdote = state.find(anecdote => anecdote.id === id)
      const anecdoteChanged = {
        ...findAnecdote,
        votes: findAnecdote.votes + 1
      }
      return state.map(anecdote => (anecdote.id === id) ? anecdoteChanged : anecdote)
    },
    addAnecdote: (state, action) => {
        state.push(action.payload)
    },
    setAnecdotes: (state, action) => {
      return action.payload
    }
  }
})

// const anecdoteReducer = (state = initialState, action) => {

//   switch(action.type){
//     case "VOTE" : 
//       const id = action.payload.id
//       const findAnecdote = state.find(anecdote => anecdote.id === id)
//       const anecdoteChanged = {
//         ...findAnecdote,
//         votes: findAnecdote.votes + 1
//       }
//       return state.map(anecdote=>(anecdote.id===id) ? anecdoteChanged : anecdote)
//     case "ADD_ANECDOTE": {
//       return [...state, action.payload]
//     }
//     default:
//       return state
//   }

// }
export const {vote, addAnecdote, setAnecdotes} = anecdoteSlice.actions

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch(addAnecdote(newAnecdote))
  }
}

export const setVote = (id) => {
  return async dispatch => {
    const votedAnecdote = await anecdotesService.vote(id)
    dispatch(vote(votedAnecdote))
  }
}


export default anecdoteSlice.reducer