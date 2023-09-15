import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const SetBirthyear = ({ authors }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [errMessage, setErrMessage] = useState({ message: null, color: null })
  
  const [editNumber, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error.graphQLErrors[0])
      setErrMessage({
        message: error.graphQLErrors[0].message,
        color: 'red'
      })
      setTimeout(() => setErrMessage({ message: null, color: null }),3000)
    }
  })

  useEffect(() => {
    if (result.data) {
      setErrMessage(
        result.data.editAuthor === null
          ? { message: 'author not found', color: 'red' }
          : { message: 'author updated successfully', color: 'green' }
      )
      setTimeout(() => setErrMessage({ message: null, color: null}), 3000)
    }
  }, [result.data])

  const submit = (event) => {
    event.preventDefault()
    
    editNumber({
      variables: {
        name, born: Number(born)
      }
    })

    setName('')
    setBorn('')
  }

  return(
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <select value={name} onChange={({target}) => setName(target.value)}>
          <option value=""></option>
          { authors.map( a => {
            return <option value={a.name} key={a.id}>{ a.name }</option>
          }) }
        </select>
        <div>
          born <input value={born} onChange={({ target }) => setBorn(target.value) } />
        </div>
        <button type='submit' disabled={name === '' || born === '' } >update author</button>
      </form>

      { errMessage.message && 
        <p style={{color: errMessage.color}}>{ errMessage.message }</p>
      }
    </div>
  )
}

export default SetBirthyear