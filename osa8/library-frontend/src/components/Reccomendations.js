import { useQuery } from '@apollo/client'
import { FAVORITE_GENRE } from '../queries'

const Reccomendations = (props) => {
  const queryResult = useQuery(FAVORITE_GENRE)

  if (queryResult.loading) {
    return null
  }
  if (!props.show) {
    return null
  }

  console.log(queryResult.data)
  const books = queryResult.data.favoriteBook
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
          {books.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Reccomendations
