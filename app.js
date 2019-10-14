'use strict'; 

const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client')));

app.get('/', function(req, res) {
    res.render('./client/index.html');
});

app.listen(2493, () => {});
