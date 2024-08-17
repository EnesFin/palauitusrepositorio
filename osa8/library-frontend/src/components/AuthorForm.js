import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

function AuthorForm({ authors }) {
  const [author, setAuthor] = useState('')
  const [born, setBorn] = useState('')

  const [changeBorn] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  function editAuthor(event) {
    event.preventDefault()
    changeBorn({
      variables: {
        name: author,
        setBornTo: Number(born),
      },
    })

    setBorn('')
  }

  return (
    <>
      <h2>Set birthyear</h2>
      <form onSubmit={editAuthor}>
        name
        <select value={author} onChange={({ target }) => setAuthor(target.value)}>
          {authors.map((author) => (
            <option key={author.id} value={author.name}>
              {author.name}
            </option>
          ))}
        </select>
        <div>
          born
          <input type='number' value={born} onChange={({ target }) => setBorn(target.value)} />
        </div>
        <button type='submit'>Update Author</button>
      </form>
    </>
  )
}

export default AuthorForm
