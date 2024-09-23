import dBconfig from "../config/dbConfig.js";

// const {Sequelize ,  DataTypes} = require('sequelize');
import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize(
    dBconfig.DB,
    dBconfig.USER,
    dBconfig.PASSWORD,{
        host: dBconfig.host,
        dialect: dBconfig.dialect,
        operatorsAliases: false,
    }
)
sequelize.authenticate()
.then(()=>console.log("Mandeha raha Jiaby"))
.catch((err)=>console.log('misy erreur ' + err))

const db = {}

db.Sequelize = Sequelize 
db.sequelize = sequelize

import modelVente from "./venteModel.js";
import modelMouvement from './mouvement.js';
import modelArticle from "./articleModel.js";
import modelfournisseur from './fournisseurModel.js'
import modelDestinateur from "./destinateurModel.js";
import modelDetenteur from "./detenteurModel.js";


db.vente = modelVente(sequelize, DataTypes)
db.article = modelArticle(sequelize , DataTypes)
db.fournisseur = modelfournisseur(sequelize , DataTypes)
db.mouvement = modelMouvement(sequelize , DataTypes)
db.destinateur = modelDestinateur(sequelize , DataTypes)
db.detenteur = modelDetenteur(sequelize, DataTypes)


db.sequelize.sync({force: false})
.then(()=>console.log('yes _ resync is just done!'))

// 1 to many Relation

export default db