const express = require('express');
const parser = require('body-parser');
const path = require('path');
// const cors = require('cors')
// require('./db');
const port = process.env.PORT || 3002
const server = express();

server.use(parser.json());
server.use(parser.urlencoded({extended: true}));

server.use(express.static(path.resolve(__dirname + '../src')))

server.get('/*', (req,res)=> {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'))
})

server.listen(port, (err) =>{
  if (err){
    console.log(err);
  }
  console.log('listening on port ' + port)
})