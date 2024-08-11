import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote(state, action) {
      const votedAnecdote = action.payload
      const { id } = votedAnecdote
      const updatedAnecdotes = state.map((anecdote) =>
        anecdote.id === id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      )
      return updatedAnecdotes
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { addVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteForAnecdote = anecdote => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.vote(anecdote)
    dispatch(addVote(votedAnecdote))
  }
}
export default anecdoteSlice.reducer
