const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');


app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + 'public'));

//Engine View
const handlebars = require('express-handlebars');

app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', handlebars.create({
    defaultLayout: 'main',
    extname: '.hbs'
}).engine);
app.set('view engine', '.hbs')

app.use(require('./routes/index.js'))

app.listen(8080, () => { console.log('Servidor Express corriendo')});

