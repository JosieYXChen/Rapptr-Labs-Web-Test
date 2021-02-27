const express = require('express')
const morgan = require("morgan")
const path = require('path')
const bodyParser = require('body-parser')
const http = require('http');
const request = require('request');
const app = express();
module.exports = app;


// setting up logging, static, and parsing middlewares
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'build')))

// parse incoming request bodies
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
})

app.post('/api/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email, password, "server");

    const options = {
      uri: 'http://dev.rapptrlabs.com/Tests/scripts/user-login.php',
      form: {
        email,
        password
      }
    }

    request.post(options, (err, httpResponse, body) => {
      if(err) return console.error("upload failed:", err);
      res.json(body);
    })
  } catch(err){
    console.log("failed to post form to api", err);
  }
})

// when no route found, get the index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'))
})

// error handling endware
app.use((err, req, res, next) => {
  console.log(err);
  console.log(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal Server error.')
})

// start server
const port = process.env.PORT || 5000;
const bootApp = async () => {
  await app.listen(port, () => {
    console.log(`Your server, listening on port ${port}`)
  })
}

bootApp();
