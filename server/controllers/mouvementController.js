import db from "../models/index.js"
import express from "express"
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
import { Sequelize } from "sequelize";

// create main Model
const Article = db.article
const MouvementStock = db.mouvement

const entranceMouvement =async(req, res)=>{

    try {
      
        const { id, typeMouvement, quantite, fournisseur, design, typeArticle, unite ,numArticle} = req.body;       
        const mouvement = await MouvementStock.create({
            itemId : id,
            numArticle,
            design,
            typeMouvement,
            quantite,
            dateMouvement: new Date(),
            fournisseur,
            typeArticle,
            unite,
        });
        // Update item quantity
        const article = await Article.findByPk(id);
            article.quantite = Number(article.quantite) + Number(quantite);
            await article.save();

        res.status(201).send(mouvement);
    } catch (error) {
        res.status(500).json({ error: 'Error creating stock movement ts mandeha' });
    }
}
const exitMouvement =async(req, res)=>{
    try {

        const { id, typeMouvement, quantite, design, typeArticle, unite, beneficiaire, detenteur ,numArticle} = req.body;       
        const mouvement = await MouvementStock.create({
            itemId : id,
            numArticle,
            design,
            typeMouvement,
            quantite,
            dateMouvement: new Date(),
            beneficiaire,
            detenteur,
            typeArticle,
            unite,
        });
        console.log('mandeha')
        // Update item quantity
        const article = await Article.findByPk(id);
            article.quantite = Number(article.quantite) - Number(quantite);
            await article.save();

        res.status(201).json(mouvement);
    } catch (error) {
        res.status(500).json({ error: 'Error creating stock movement ts mandeha' });
    }
}
const mouvementSortie=async(req, res)=>{
  try {

        let mouvement = await  MouvementStock.findAll({})
        res.status(200).send(mouvement)
    
  } catch (error) {
    res.status(500).json({ error: 'Error fetching Mouvement' });
  }
}

const listEntrnceMouvement =async(req, res)=>{
    try {
        // Fetch all movements with type "entrée"
        const mouvements = await MouvementStock.findAll({
            where: { typeMouvement: 'entree' }
        });
        // Return the fetched movements
        res.status(200).send(mouvements);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching entrée movements' });
    }
}

const listExitMouvement =async(req, res)=>{
    try {
        // Fetch all movements with type "entrée"
        const mouvements = await MouvementStock.findAll({
            where: { typeMouvement: 'sortie' }
        });
        // Return the fetched movements
        res.status(200).send(mouvements);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching entrée movements' });
    }
}

const getMouvementData = async (req , res) => {
  const result = await MouvementStock.findAll({
    attributes: [
      'itemId',  // Group by article_id
      'design',
      'numArticle',

      // Sum of entrance quantities (ENTREE)
      [Sequelize.literal(`SUM(CASE WHEN  typeMouvement = 'entree' THEN quantite ELSE 0 END)`), 'total_entrance_quantity'],

      // Sum of exit quantities (SORTIE)
      [Sequelize.literal(`SUM(CASE WHEN  typeMouvement = 'sortie' THEN quantite ELSE 0 END)`), 'total_exit_quantity'],

      // Rest quantity: (total_entrance - total_exit)
      [Sequelize.literal(`
        SUM(CASE WHEN  typeMouvement = 'entree' THEN quantite ELSE 0 END) -
        SUM(CASE WHEN  typeMouvement = 'sortie' THEN quantite ELSE 0 END) 
      `), 'rest_quantity']
    ],
    group: ['itemId', 'design', 'numArticle'],  // Group by article_id and design
    raw: true  // Return raw data
  });
  return  res.status(200).send(result);
};



// ========== modification mouvement Entree ==========


// ========== modification mouvement Sortie ==========


// ============= suppression mouvement ===============




export {entranceMouvement , exitMouvement , mouvementSortie , listEntrnceMouvement , listExitMouvement , getMouvementData}