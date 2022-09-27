const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the API'
  });
});

app.post('/api/createPosts', verifyToken, (req, res) => {  
    console.log("token => ",req.token);
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    console.log("err ",err)
    console.log("authdata ",authData);
    if(err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post created...',
        authData
      });
    }
  });
});

app.post('/api/login', (req, res) => {
  // Mock user
  const user = {
    id: 1, 
    username: 'francis',
    email: 'francis@edulab.in',
    role:'admin'
  }

  jwt.sign({user}, 'secretkey', { expiresIn: '3000s' }, (err, token) => {
    console.log("login token => ",token);
    res.json({
      token
    });
  });
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  console.log("bearerHeader =>",bearerHeader);
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    console.log("bearer $$$$ ",bearer);
    const bearerToken = bearer[1];
    console.log("bearerToken @@@@ ",bearerToken);
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }

}
function print(req,res,next){
    console.log('@1');
    next();
}
app.listen(5000, () => console.log('Server started on port 5000'));