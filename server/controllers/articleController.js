
import db from "../models/index.js"
import express from "express"
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// create main Model
const Article = db.article
const MouvementStock = db.mouvement

// MAIN work

// 1. create vente

const addArticle = async(req , res) =>{
    try {
        const article = await Article.create(req.body);
        res.status(201).json(article);
    } catch (error) {
        res.status(500).json({ error: 'Error creating article' });
    }
}

const addArticleMouvement = async(req , res) =>{ 
    const { numArticle,design, obs, quantite, fournisseur, typeArticle, piece } = req.body;

    try {
       // Create the article (item)
        const article = await Article.create({
            numArticle,
            design,
            obs,
            quantite,
            fournisseur,  
            dateAquisition: new Date(),
            typeArticle,
            piece
        });

        // Automatically create the "entrée" movement when the article is added
        const mouvement = await MouvementStock.create({
            itemId: article.id,  // ID of the newly created article
            numArticle,
            typeMouvement: "entree",
            design,
            quantite,
            fournisseur,
            dateMouvement: new Date(),
            typeArticle,
            unite:piece,
        });

        res.status(201).json({
            message: "Article and stock entry created successfully",
            article,
            mouvement
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error creating article and stock entry" });
    }
};



const getAllArticle = async (req, res)=>{
    let article = await  Article.findAll({})
    res.status(200).send(article)
}


export { addArticle , getAllArticle, addArticleMouvement}