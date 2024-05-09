import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const PORT = process.env.SERVER_PORT || 4000

app.listen(PORT, () => {
  console.info(`Example app listening on port ${PORT}`)
})