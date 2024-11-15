import { Sequelize } from "sequelize";
import db from "../config/dbConfig.js";
import Users from "./UserModel.js";

const {DataTypes} = Sequelize;

const Products = db.define('product', {
    uuid: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    validate:{ 
        notEmpty: true
    }},
    name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{ 
        notEmpty: true,
        len: [1, 100]
    }},
    price: {
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

Users.hasMany(Products);
Products.belongsTo(Users, {ForeignKey: 'userId'});

export default Products;