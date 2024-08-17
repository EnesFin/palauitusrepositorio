import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useState } from 'react'

const Books = (props) => {
  const [genre, setGenre] = useState('')
  const queryResult = useQuery(ALL_BOOKS)

  if (queryResult.loading) {
    return null
  }
  if (!props.show) {
    return null
  }

  console.log(queryResult.data)
  const books = queryResult.data.allBooks
  const uniqueGenres = [...new Set(books.flatMap((item) => item.genres))]
  console.log(uniqueGenres)
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter((book) => (genre !== '' ? book.genres.includes(genre) : book))
            .map((book) => (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {uniqueGenres.map((genre) => (
        <button key={genre} onClick={() => setGenre(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={() => setGenre('')}>all genres</button>
    </div>
  )
}

export default Books
