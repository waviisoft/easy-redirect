const express = require('express')
const app = express()
const PORT = 3000

const redirect = 'https://www.waviisoft.com/'

app.get('/*', (req, res) => {
  console.log(`Host: ${req.hostname}`)
  res.status(302).header('Location', redirect).send(`<a href="${redirect}">Found</a>`)
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
