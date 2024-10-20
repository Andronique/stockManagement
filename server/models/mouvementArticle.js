import { Sequelize } from "sequelize";
import db from "../config/dbConfig.js";
import User from "./UserModel.js";
import Detenteur from "./detenteurModel.js";
import Article from "./articleModel.js";

const {DataTypes} = Sequelize;

const Mouvement = db.define('mouvement', {
    uuid: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    validate:{ 
        notEmpty: true
    }},
    typeMouvement: {
        type: DataTypes.STRING,
    }, 
    ref: {
        type: DataTypes.STRING,
    }, 
    dateMouvement: {
        type: DataTypes.DATE,
    },
    design: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{ 
        notEmpty: true,
        len: [3, 100]
    }},
    fournisseur: {
    type: DataTypes.STRING,
    validate:{
        len: [3, 100]
    }},

    typeArticle: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{ 
        notEmpty: true,
        len: [1, 100]
    }},

    unite: {
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
    beneficiaire: {
        type: DataTypes.STRING
    },
    detenteurId: {
        type: DataTypes.INTEGER
    }, 
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{ 
            notEmpty: true,
    }},
    articleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{ 
            notEmpty: true,
    }},
},{
    freezeTableName: true
})


User.hasMany(Mouvement);
Detenteur.hasMany(Mouvement);
Article.hasMany(Mouvement);
Mouvement.belongsTo(User, {ForeignKey: 'userId'});
Mouvement.belongsTo(Article, {ForeignKey: 'articleId'});
Mouvement.belongsTo(Detenteur, {ForeignKey: 'detenteurId'});

export default Mouvement;