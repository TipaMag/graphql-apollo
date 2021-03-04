import React, { useEffect, useState } from 'react'

import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_USERS, GET_USER_BY_ID } from './query/user';
import { CREATE_USER } from './mutations/user';

function App() {
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS)
  const { data: oneUser, loading: oneUserLoading } = useQuery(GET_USER_BY_ID, {
    variables: {
      id: 1
    }
  })
  const [newUser] = useMutation(CREATE_USER)
  const [users, setUsers] = useState([])

  const [userName, setUserName] = useState('')
  const [userAge, setUserAge] = useState(0)

  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers)
    }
  }, [data, loading])

  useEffect(() => {
    if (!oneUserLoading) {
      console.log(oneUser)
    }
  }, [oneUser, oneUserLoading])

  const addNewUser = (e) => {
    e.preventDefault()
    newUser({
      variables: {
        input: {
          userName: userName,
          age: +userAge
        }
      }
    }).then(({data}) =>{
      console.log(data)
      setUserName('')
      setUserAge(0)
    })
  }

  const getAllUsers = () => {
    refetch()
  }

  return (
    <div className="App">
      <form style={{ marginTop: '50px', marginBottom: '50px' }}>
        <input value={userName} onChange={(e) => setUserName(e.target.value)} type="text" placeholder="userName" />
        <input value={userAge} onChange={(e) => setUserAge(e.target.value)} type="number" placeholder="age" />

        <button onClick={e => addNewUser(e)} type="submit">create user</button>
      </form>

      <button onClick={getAllUsers}>get users</button>
      <h3>Users list:</h3>

      <ul>
        {
          users?.length > 0 && users.map(user => (
            <li key={user.id}>
              <p>name: {user.userName} age: {user.age}</p>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
