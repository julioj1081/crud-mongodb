const express = require('express');
const path = require('path');
const morgan = require('morgan');
const indexRouters = require('./routes/index');
const mongoose = require('mongoose');

const app = express();
//conexion a la base de datos
mongoose.connect('mongodb://localhost/crud-mongo', {useUnifiedTopology: true, useNewUrlParser: true })
.then(resol => console.log('Conexion con la base de datos'))
.catch(err => console.log(err));

//rutas

//configuracion
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middlewares funcion que se ejecuta antes de llegar a las rutas
//proceso de ida y vuelta del servidor clientes
app.use(morgan('dev'));
//entender los datos en forma de json
app.use(express.urlencoded({extended: false}));


//rutas
app.use('/', indexRouters);
//inicio de servidor

app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});