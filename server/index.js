const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')

const schema = require('./schema')

const app = express()
app.use(cors())


const users = [
    {id: 1, userName: 'Sv', age: 30},
    {id: 2, userName: 'Andrey', age: 30}
]

const createUser = (input) => {
    const id = Date.now()
    return {
        id, ...input
    }
}

const root = {
    getAllUsers: () => {
        return users
    },
    getUser: ({id}) => {
        return users.find(user => user.id == id)
    },
    createUser: ({input}) => {
        console.log(input)
        const user = createUser(input)
        users.push(user)
        return user
    }
}

app.use('/graphql', graphqlHTTP({
    graphiql: true,

    schema: schema,
    rootValue: root
}))

app.listen(5000, () => console.log('server started on port 5000'))