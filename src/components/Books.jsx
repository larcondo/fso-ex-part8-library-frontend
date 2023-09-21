import { useState } from 'react'
import { ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'

const Books = (props) => {
  const [filter, setFilter] = useState('all genres')
  const [genres, setGenres] = useState(null)

  const result = useQuery(ALL_BOOKS, {
    variables: { genre: null },
    skip: !props.show,
    onError: (error) => console.log(error.graphQLErrors[0].message),
    onCompleted: (data) => {
      let generos = []
      data.allBooks
        .map(b => generos = generos.concat(b.genres))
        
      setGenres([...new Set(generos.concat('all genres'))])
    }
  })
  
  if (!props.show) return null

  if (result.loading) return <div>loading...</div>

  const books = result.data.allBooks

  return(
    <div>
      <h2>books</h2>
      { filter && <p>in genre: <b>{ filter }</b></p> }
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
                <td>{ b.author.name }</td>
                <td>{ b.published }</td>
                <td>{ b.genres.join(' / ') }</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div>
        { genres && genres.map( g => 
          // using useQuery 'refetch'
          <button key={g} 
            onClick={() => { 
              setFilter(g)
              result.refetch({ genre: g !== 'all genres' ? g : null })
            }}
          >
            { g }
          </button>
        )}
      </div>
    </div>
  )
}

export default Books