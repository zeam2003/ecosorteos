const express = require('express');
const app = express();
const path  = require('path');
//import { fileURLToPath } from 'url';
const bodyParser  = require('body-parser');
const router = require('./routes/index.js');
const handlebars  = require('express-handlebars');

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);

//Engine View
app.set('views', path.join( __dirname, 'views'));
app.engine('.hbs', handlebars.create({
    defaultLayout: 'main',
    extname: '.hbs'
}).engine);
app.set('view engine', '.hbs')

// app.set('views', path.join(__dirname,'views'));
// app.engine('.hbs', handlebars.create({
//     defaultLayout: 'main',
//     extname: '.hbs'
//  }).engine);
//  app.set('view engine', '.hbs')


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));




app.use(router);

app.use(express.static(path.join(__dirname + '/public')));

app.listen(8080, () => { console.log('Servidor Express corriendo')});

