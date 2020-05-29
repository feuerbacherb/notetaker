// dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');

// express app
const app = express();
const PORT = process.env.PORT || 3001;

// data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

require('./routes/routes')(app);

app.listen(PORT, function() {
   console.log('App listening on PORT: ' + PORT);
});