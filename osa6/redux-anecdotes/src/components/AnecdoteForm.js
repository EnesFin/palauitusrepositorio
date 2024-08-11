import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  // Päästään käsiksi storeen 
  const dispatch = useDispatch()

  // Anekdootin lisäys
  const addAnecdote = async (event) => {
    event.preventDefault()
    
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))  
    dispatch(setNotification(`added '${content}'`, 2)) 
  }

  return (
    <>
    <h2>create new</h2>
    <form onSubmit={addAnecdote}>
      <div><input name='anecdote' /></div>
      <button type='submit'>create</button>
    </form>
    </>
  )
}

export default AnecdoteForm