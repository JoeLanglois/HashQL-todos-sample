require('dotenv').config()

const HashQL = require('hashql/server')
const Pgp = require('pg-promise')
const express = require('express')
const bodyParser = require('body-parser')
const queries = require('./queries.json')

const pgp = Pgp()
  , db = pgp(process.env.POSTGRES_URL || 'postgres://localhost/atlas')
  , app = express()
  , port = process.env.PORT || 5000
  , dev = process.env.NODE_ENV === 'development' ? true : undefined

const hql = HashQL({
  db,
  query: dev
    ? q => q.sql
    : q => queries[q.sql]
})

app.post('/sql', bodyParser.json(), (req, res, next) =>
  hql(req.body)
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ error: err.message || err.toString() }))
)

app.listen(port, () => console.log('Listening on', port))
