const express = require('express');
const router = express.Router();
const slugiFy = require('slugify');

//models
const Note = require('./Note');

//  **********  ROTAS DAS VIEWS ****************

//busca e renderiza as notas
router.get('/admin/notes', (req, res) => {
    Note.findAll({ order: [['id', 'DESC']]}).then(notes => {
        res.render('admin/notes/index', {notes: notes})
    })
    
})

//page new
router.get('/admin/notes/new', (req, res) => {
    res.render('admin/notes/new')
})

//page edit
router.get('/admin/notes/edit', (req, res) => {
    res.render('admin/notes/edit')
})


// *************** ROTAS PARA EXECUTAR FUNCOES NO BANCO ***********************

router.post('/admin/notes/create', (req, res) => {
    let title = req.body.title;
    let body = req.body.body;
    var category = req.body.category;

    if (title != undefined) {
        Note.create({
            title: title,
            slug : slugiFy(title),
            body: body,
            CategoryId: category
        }).then(() => {
            res.redirect('/admin/notes')
        })
    } else {
        res.redirect('/admin/notes/new')
    }
    
})

module.exports = router;