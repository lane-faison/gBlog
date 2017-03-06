const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000
const bodyParser = require('body-parser')
const gblogs = require('./routes/gblogs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/gblogs', gblogs)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
