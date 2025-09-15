const express = require('express')
const app = express();
// const route = require('./routes')
const port = 3000;
const connection = require('./connection');






connection();
app.listen(port ,()=>{console.log('connected to port :-',port)})