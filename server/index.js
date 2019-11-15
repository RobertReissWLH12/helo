require('dotenv').config();
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const controller = require('./controller')
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

const app = express()

app.use(express.json())

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET
}))

massive(CONNECTION_STRING)
.then(db => {
    app.set('db', db);
    console.log('database is connected')
    app.listen(SERVER_PORT, () =>
        console.log(`When ${SERVER_PORT} lines of code you reach, look as good your program will not, hm?`))
})

// ENDPOINTS
app.post('/auth/register', controller.register)
app.post('/auth/login', controller.login)