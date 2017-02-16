const mongoose = require('mongoose');
const express = require('express');
const config = require('config');
const router = require('./router');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect(config.get('mongoUri'),(err,doc) => {
  if(err){
    console.log('connect error')
  }else {
    console.log('connect success')
  }
});


app.use(bodyParser.json());

router(app);

app.listen(config.get('httpPort'), ()=> {
  console.log('server started at http://localhost:' + config.get('httpPort'));   // eslint-disable-line no-console
});

module.exports = app;