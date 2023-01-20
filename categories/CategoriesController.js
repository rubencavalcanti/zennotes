const express = require('express');
const router = express.Router();
const slugiFy = require('slugify');

//models
const Category = require('./Category');


//  **********  ROTAS DAS VIEWS ****************



//busca e renderiza as categorias 
router.get('/admin/categories', (req, res) => {
    Category.findAll({ order: [['id', 'DESC']]}).then(categories => {
        res.render('admin/categories/index', {categories: categories})
    })
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

//renderizar view new
router.get('/admin/categories/new', (req, res) => {
    res.render('admin/categories/new')
})


// *************** ROTAS PARA EXECUTAR FUNCOES NO BANCO ***********************


//CREATE
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

//UPDATE
router.post('/admin/categories/update', (req, res) => {
    let id = req.body.id;
    let title = req.body.title;

    Category.update({
        title: title,
        slug: slugiFy(title)
    }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/admin/categories')
    })
})


//DELETE
router.post('/admin/categories/delete', (req, res) => {
    let id = req.body.id;

    if (id != undefined && !isNaN(id)){
        Category.destroy({
            where: {id: id},
        }).then(() => {
            res.json({
                "sucess" : "success"
            })
        })
    } else {
        res.redirect('/admin/categories')
    }
})


module.exports = router;