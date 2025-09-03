
const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize/index');

const Superhero = sequelize.define(
    'Superhero',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nickname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        real_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        origin_description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        superpowers: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        catch_phrase: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    },
    {
        tableName: 'superheroes',
        timestamps: false,
        underscored: true,
    }
);

module.exports = Superhero;
