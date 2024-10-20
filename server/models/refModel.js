
import { Sequelize } from "sequelize";
import db from "../config/dbConfig.js";

const {DataTypes} = Sequelize;

const ArticleCounter = db.define('refcounter', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      lastNumArticle: {
        type: DataTypes.STRING,
        allowNull: false
      },
},{
    freezeTableName: true
})

export default ArticleCounter;