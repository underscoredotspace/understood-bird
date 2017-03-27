// init project
var express = require('express')
var app = express()
var r = require('./reddit')

app.set('json spaces', 2);
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

app.get('/r/:reddit', (req, res) => {
  r.getSubReddit(req.params.reddit, (subreddit) => {
    res.json(subreddit.data.children)
  })
})

app.get('/r/:reddit/comments/:postid', (req, res) => {
  r.getComments(req.params.reddit, req.params.postid, (comments) => {
    res.json(comments)
  })
})

app.use(express.static('public'))
app.use('/bower_components/', express.static('bower_components'))

// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
})