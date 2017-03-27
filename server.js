// init project
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var r = require('./reddit')

app.use((req, res, next) =>{
  console.log(req.method, req.url)
  next()
})

app.use('/login/callback', (req, res) => {
  res.json({ok: 'ok'})
})

app.get('/about', (req, res) => {
  res.send('This is just  test for now, not for your use. ')
})

app.get('/token', (req, res) => {
  r.getAccessToken((token) => {
    res.send(token)
  })
})

app.get('hot', (req, res) => {
  
})

app.use(express.static('public'))

// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
})