import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('Restaurant API is running!')
})

app.listen(5000)