import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import AuthorForm from './AuthorForm'

const Authors = (props) => {
  const queryResult = useQuery(ALL_AUTHORS)
  if (queryResult.loading) {
    return null
  }
  if (!props.show) {
    return null
  }
  console.log(queryResult.data)
  const authors = queryResult.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AuthorForm authors={authors}></AuthorForm>
    </div>
  )
}

export default Authors
