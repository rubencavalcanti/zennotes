const express = require('express');
const router = express.Router();

router.get('/admin/categories', (req, res) => {
    res.render('admin/categories/index')
})

module.exports = router;