import { Sequelize } from "sequelize";
import db from "../config/dbConfig.js";

const {DataTypes} = Sequelize;

const Detenteur = db.define('detenteur', {
    uuid: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    validate:{ 
        notEmpty: true
    }},
    post: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{ 
        notEmpty: true,
        len: [1, 100]
    }},
},{
    freezeTableName: true
})

export default Detenteur;

