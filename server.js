const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const path = require('path')
const util = require('./util/index')



// set path
const staticPath = path.join(__dirname, './dist')
app.use('/', express.static(staticPath))

// set express server

app.all('/*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  next()
})

app.use('/files', express.static('.', {
  dotfiles: 'allow',
  setHeaders: function (res, path, stat) {
    res.header('Content-Type', 'text/plain')
  }
}))


// set socket io
let data = {}
data.ls = util.getDirJson('.')
data.list = util.getDirList('.')

io.on('connection', function (socket) {
  io.emit('list', data.ls)
})


http.listen(1112, function () {
  console.log('Hit CTRL-C to stop the server')
})