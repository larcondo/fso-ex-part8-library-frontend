import { useState } from 'react'
import { ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'

const Books = (props) => {
  const [filter, setFilter] = useState('all genres')
  const result = useQuery(ALL_BOOKS, {
    skip: !props.show
  })
  
  if (!props.show) return null

  if (result.loading) return <div>loading...</div>

  const books = result.data.allBooks
  let gen = []
  const generos = result.data.allBooks.map( b => b.genres)
  generos.forEach(element => {
    element.forEach( g => {
      if (!gen.includes(g)) gen.push(g)
    } )
  });
  gen.push('all genres')

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
            <th>genres</th>
          </tr>
          { books
              .filter(b => b.genres.includes(filter) || filter === 'all genres')
              .map( b => (
                <tr key={b.title}>
                  <td>{ b.title }</td>
                  <td>{ b.author.name }</td>
                  <td>{ b.published }</td>
                  <td>{ b.genres.join(' / ')}</td>
                </tr>
              ))
          }
        </tbody>
      </table>
      <div>
        {gen && gen.map( g => 
          <button key={g} onClick={() => setFilter(g)}>
            { g }
          </button>
        )}
      </div>
    </div>
  )
}

export default Books