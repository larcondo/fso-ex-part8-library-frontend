import { useState } from 'react'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'

const App = () => {
  const [page, setPage] = useState('')
  const [token, setToken] = useState(null)
  // To reset cache after logout
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    // reset cache
    client.resetStore()
    localStorage.removeItem('library-token')
    setPage('')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        { !token && <button onClick={() => setPage('login')}>login</button>}
        { token && <button onClick={() => setPage('add')}>add book</button> }
        { token && <button onClick={logout}>logout</button> }
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />
      
      <LoginForm show={page === 'login' && !token} setToken={setToken} />

      <NewBook show={page === 'add' && token} setPage={setPage} />

    </div>
  )
}

export default App
