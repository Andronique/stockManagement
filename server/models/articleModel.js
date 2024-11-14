import Users from "./UserModel.js";
import { Sequelize } from "sequelize";
import db from "../config/dbConfig.js";

const {DataTypes} = Sequelize;

const Article = db.define('article', {
    uuid: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    validate:{ 
        notEmpty: true
    }},
    ref: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{ 
        notEmpty: true,
        len: [1, 100]
    }},

    design: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{ 
        notEmpty: true,
        len: [1, 100]
    }},
    fournisseur: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{ 
        notEmpty: true,
        len: [1, 100]
    }},

    typeArticle: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{ 
        notEmpty: true,
        len: [1, 100]
    }},
    obs: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{ 
        notEmpty: true,
        len: [1, 100]
    }},

    dateAquisition: {
        type: DataTypes.DATE,
        allowNull: false
    },

    piece: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{ 
        notEmpty: true,
        len: [1, 100]
    }},
    quantite: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate:{ 
        notEmpty: true,
    }},
    userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate:{ 
        notEmpty: true,
    }},
},{
    freezeTableName: true
})

Users.hasMany(Article);
Article.belongsTo(Users, {ForeignKey: 'userId'});


export default Article;