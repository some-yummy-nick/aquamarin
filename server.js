const dev = process.env.NODE_ENV !== 'production'
const next = require('next')
const routes = require('./routes')
const auth = require('./auth')
const app = next({ dev })
const handler = routes.getRequestHandler(app)
const express = require('express')

const options = {
  root: __dirname + '/static/',
  headers: {
    'Content-Type': 'text/plain;charset=UTF-8'
  }
}

app.prepare().then(() => {
  express()
    .get('/robots.txt', (req, res) =>
      res.status(200).sendFile('robots.txt', options)
    )
    // .use(auth)
    .use(handler)
    .listen(8005)
})
