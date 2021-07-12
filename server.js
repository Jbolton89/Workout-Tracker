const express = require('express');
const logger = require('morgan')
const mongoose = require('mongoose');
const path = require('path');
const app = express(); 


app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'public')));            

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/vast-mountain-93750', { 
    useNewUrlParser: true, 
    useFindandModify: false, 
    useUnifiedTopology: true, 
    useCreateIndex: true
});

app.use(require('./controllers/api.js'));
app.use(require('./controllers/index.js'));


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });