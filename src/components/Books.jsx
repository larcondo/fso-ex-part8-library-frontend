import { ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'

const Books = (props) => {
  if (!props.show) return null
  
  const result = useQuery(ALL_BOOKS)

  if (result.loading) return <div>loading...</div>

  const books = result.data.allBooks

  return(
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          { books.map( b => (
            <tr key={b.title}>
              <td>{ b.title }</td>
              <td>{ b.author }</td>
              <td>{ b.published }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books