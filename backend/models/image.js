'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Image extends Model {
        static associate(models) {
            Image.belongsTo(models.superheroes, {
                foreignKey: 'superhero_id',
                as: 'superhero'
            });
        }
    }

    Image.init(
        {
            superhero_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            url: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'Image',
            tableName: 'images',
            underscored: true,
            timestamps: true
        }
    );

    return Image;
};
