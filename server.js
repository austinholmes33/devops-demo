const express = require('express')
const app = express()
const path = require('path')
require('dotenv').config()

app.use(express.json())

const students = ['Jimmy', 'Timothy', 'Jimothy']

var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: process.env.ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// rollbar.critical()
// rollbar.info()
// rollbar.warning()
// rollbar.error()


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/api/students', (req, res) => {
    res.status(200).send(students)
})

app.post('/api/students', (req, res) => {
   let {name} = req.body

   rollbar.info('student named ' + name + ' is being added')
   const index = students.findIndex(student => {
       return student === name
   })

   try {
    function notAFunction () {
        return('nothing')
    }
   } catch {
    rollbar.critical('caught backend failure')
   };

   try {
    function notAFunction () {
        return('nothing')
    }
   } catch {
    rollbar.warning('')
   };

   try {
    function notAFunction () {
        return('nothing')
    }
   } catch {
    rollbar.info('caught backend failure')
   };

   try {
    function notAFunction () {
        return('nothing')
    }
   } catch {
    rollbar.error('caught backend failure')
   };


   try {
       if (index === -1 && name !== '') {
           students.push(name)
           res.status(200).send(students)
       } else if (name === ''){
           res.status(400).send('You must enter a name.')
       } else {
           res.status(400).send('That student already exists.')
       }
   } catch (err) {
       console.log(err)
   }
})

app.delete('/api/students/:index', (req, res) => {
    const targetIndex = +req.params.index
    
    students.splice(targetIndex, 1)
    res.status(200).send(students)
})

const port = process.env.PORT || 5050

app.listen(port, () => console.log(`Server listening on ${port}`))