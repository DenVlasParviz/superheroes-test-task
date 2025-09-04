'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Image extends Model {
        static associate(models) {
            Image.belongsTo(models.Superhero, {
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
            },
            fullUrl:{
                type: DataTypes.VIRTUAL,
                get(){
                    return `http://localhost:3000/${this.url.replace(/\\/g, '/')}`;                }
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