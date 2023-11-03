const express = require('express')
const vercelkv = require('@vercel/kv')

const PORT = 3000
const app = express()
const kv = vercelkv.kv

app.get('/*', async (req, res, next) => {
  const { hostname } = req
  const redirect = await kv.get(hostname)
  if (!redirect) {
    next(new Error(`Host: ${hostname} - not found`))
    return
  }

  console.log(`Host: ${hostname}`)
  res.status(302).header('Location', redirect).send(`<a href="${redirect}">Found</a>`)
})

app.use((err, req, res, next) => {
  console.error(err.message)
  res.status(404).send('not found')
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
