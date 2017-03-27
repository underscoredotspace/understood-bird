var request = require('request')
var _accessToken = null

var _newAccessToken = (cb) => {
  var options = {
    url: 'https://www.reddit.com/api/v1/access_token', 
    method: 'POST',
    form: {grant_type: 'client_credentials'},
    auth: {user: process.env.CLIENT_ID, pass: process.env.CLIENT_SECRET}
  }

  request(options, function(err, response, body) {
    var oBody = JSON.parse(body)
    setTimeout(() => {
      _accessToken = null
    }, (Number(oBody.expires_in) * 1000) - 10000)
    
    _accessToken = oBody.access_token

    if (cb) cb(_accessToken)
  })
}

var access_token =(cb) => {
  if (!_accessToken) {
    // Request a new token from Reddit, the old one expired or will do in a minute
    _newAccessToken((token)=>{
      cb(_accessToken)
    })
  } else {
    // Token already requested from Reddit, still valid
    cb(_accessToken)
  }
}

var _apiRequest = (which, cb) => {
  access_token((token)=>{
    var options = {
      url: 'https://oauth.reddit.com' + which,
      auth: {bearer: token},
      headers: {
        'User-Agent': 'https://glitch.me/~understood-bird by /u/_DotSpace'
      }
    }

    request(options, (err, res, body)=>{
      cb(JSON.parse(body))
    })
  })
}

var getComments = (reddit, postid, cb) => {
  _apiRequest('/r/' + reddit + '/comments/' + postid, (res)=>{
    cb(res)
  })
}

var getSubReddit = (reddit, cb) => {
  _apiRequest('/r/' + reddit, (res)=>{
    cb(res)
  })
}

module.exports = {access_token, getSubReddit, getComments}