const express = require('express');
const router = express.Router();
//esquema de las tareas
const Task = require('../models/task');
const { request } = require('express');
const { render } = require('ejs');

/* router.get('/', (req, res) =>{
    res.status(200).send({mensagge: 'hey'});
}); */

router.get('/', async (req, res) =>{
    const tasks = await Task.find();
    res.render('index', {tasks});
});

//cuando envia los datos del formulario
router.post('/add', async (req, res) =>{
    /* console.log(new Task(req.body));
    console.log(req.body); */
    const task = new Task(req.body);
    await task.save();
    //res.status(200).send('recivido');
    res.redirect('/');
});
router.get('/hecho/:id', async (req, res) =>{
    const {id} = req.params;
    const task = await Task.findById(id);
    task.status = !task.status;
    await task.save();
    res.redirect('/');

});
//PIDE LOS DATOS DEL JSON
router.get('/update/:id', async (req, res) =>{
    const {id} = req.params;
    const task = await Task.findById(id);
    res.render('update', task);
});
//MODIFICA LOS DATOS DEL JSON
router.post('/modificar/:id', async (req, res) =>{
    const {id} = req.params;
    await Task.update({_id: id}, req.body);
    res.redirect('/');
}); 

router.get('/delete/:id', async (req, res) =>{
    const {id} = req.params;
    await Task.remove({_id: id});
    res.redirect('/');
});


module.exports = router;