const express = require('express');
const parser = require('body-parser');
// const cors = require('cors')
// require('./db');
const port = process.env.PORT || 3000
const server = express();
server.use(parser.json());
server.use(parser.urlencoded({extended: true}));

server.listen(port, (err) =>{
  if (err){
    console.log(err);
  }
  console.log('listening on port ' + port)
})