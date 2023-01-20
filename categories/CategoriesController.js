const express = require('express');
const router = express.Router();
const slugiFy = require('slugify');

//models
const Category = require('./Category');


//rotas
router.get('/admin/categories', (req, res) => {
    res.render('admin/categories/index')
})

//renderizar view new
router.get('/admin/categories/new', (req, res) => {
    res.render('admin/categories/new')
})

//rota para criar categoria
router.post('/admin/categories/create', (req, res) => {
    let title = req.body.title;

    if(title != undefined) {
        Category.create({
            title: title,
            slug: slugiFy(title)
        }).then(() => res.redirect('/admin/categories/new'))
    } else {
        res.render('admin/categories/new')
    }
    
})


//renderizar view edit
router.get('/admin/categories/edit/:id', (req, res) => {
    let id = req.params.id

    Category.findByPk(id).then(category => {
        if (id != undefined) {
            res.render('admin/categories/edit', {category: category})
        } else {
            res.redirect('/admin/categories')
        }
        
    })
})



module.exports = router;