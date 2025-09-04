const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize/index');

const Superhero = require('./superheroes');
const ImageFactory = require('./image');

const Image = ImageFactory(sequelize, DataTypes);

Superhero.hasMany(Image, {
    foreignKey: 'superhero_id',
    as: 'images'
});

Image.belongsTo(Superhero, {
    foreignKey: 'superhero_id',
    as: 'superhero'
});

module.exports = {
    Superhero,
    Image
};