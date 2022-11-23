import express from 'express';
const app = express();
import path from 'path';
import bodyParser from 'body-parser';
import router from './routes/index.js'


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// app.use(express.static(__dirname + 'public'));

// //Engine View
// import handlebars from 'express-handlebars';

// app.set('views', path.join(__dirname, 'views'));
// app.engine('.hbs', handlebars.create({
//     defaultLayout: 'main',
//     extname: '.hbs'
// }).engine);
// app.set('view engine', '.hbs')

app.use(router);

app.listen(8080, () => { console.log('Servidor Express corriendo')});

