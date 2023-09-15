import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const SetBirthyear = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [errMessage, setErrMessage] = useState({ message: null, color: null })
  
  const [editNumber, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => console.log(error.graphQLErrors[0].message)
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

      { errMessage.message && 
        <p style={{color: errMessage.color}}>{ errMessage.message }</p>
      }
      
      <form onSubmit={submit}>
        <div>
          name <input value={name} onChange={({ target }) => setName(target.value) } />
        </div>
        <div>
          born <input value={born} onChange={({ target }) => setBorn(target.value) } />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default SetBirthyear