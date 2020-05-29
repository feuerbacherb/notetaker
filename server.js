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

