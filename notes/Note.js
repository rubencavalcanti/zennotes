const Sequelize = require('sequelize');
const connection = require('../database/database');
const Category = require('../categories/Category')



const Note = connection.define('notes', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }, slug: {
        type: Sequelize.STRING,
        allowNull: false
    }, body: {
        type: Sequelize.TEXT,
        allowNull: false
    }

})

//relacionamento entre tabelas
Category.hasMany(Note); //uma categoria tem muitos artigos
Note.belongsTo(Category); //um artigo pertence a uma categoria

Note.sync({force: false}).then(() => {});
module.exports = Note;