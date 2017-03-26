// init project
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var request = require('request')

app.use((req, res, next) =>{
  console.log(req.method, req.url)
  next()
})

var reddit = {
  accessToken: null,
  newAccessToken: (callback) => {
    var options = {
      url: 'https://www.reddit.com/api/v1/access_token', 
      method: 'POST',
      form: {grant_type: 'client_credentials'},
      auth: {user: process.env.CLIENT_ID, pass: process.env.CLIENT_SECRET}
    }
    request(options, function(err, response, body) {
      this.accessToken = body.access_token
      if (callback) {
        callback(this.accesToken)
      }
    })
  },
  getAccessToken: () => {
    if (!this.accessToken) {
      
    } else {
      return this.accessToken
    }
  }
}

app.use('/login/callback', (req, res) => {
  res.json({ok: 'ok'})
})

app.get('/about', (req, res) => {
  res.send('This is just  test for now, not for your use. ')
})

app.get('hot', (req, res) => {
  
})

app.use(express.static('public'))

// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});