import { Op, where } from "sequelize";
import User from "../models/UserModel.js";
import Article from "../models/articleModel.js";
import Mouvement from "../models/mouvementArticle.js";
  

const getArticles = async(req, res)=> {
    try {
        let response ;
        // if(req.role === "admin"){
            response = await Article.findAll({
                attributes:[ 'id' , 'uuid','ref', 'design','fournisseur', 'quantite','typeArticle', 'dateAquisition','piece'],
                include:[{
                    model:User,
                    attributes:['name','email']
                }]
            });
        // } 
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

const getArticleById = async(req, res)=>{
    try {
        const article = await Article.findOne({
            where: {
                uuid: req.params.id
            }
        })

        if(!article) return res.status(400).json({msg: "Article not found"})
        
            let response;
            // if(req.role === "admin"){
                response = await Article.findOne({
                    attributes:['id','ref', 'uuid', 'design','fournisseur', 'quantite','typeArticle', 'dateAquisition','piece', 'obs'],
                    where:{
                        id: article.id
                    }, 
                    include:[{
                        model:User,
                        attributes:['name','email']
                    }]
                });
            // } 
            res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }

}


const createArticles =async (req, res)=>{
  
    const {numArticle, design, obs , fournisseur, typeArticle, piece, quantite, date} = req.body;
    console.log(req.body)
    try {
        const article =  await Article.create({
             ref:numArticle,
             design,
             obs, 
             fournisseur,
             typeArticle, 
             piece,
             quantite, 
             dateAquisition: date,
             userId: req.userId
        });


        const mouvement = await Mouvement.create({  
            ref:numArticle,
            typeMouvement: "entree",
            design,
            quantite,
            fournisseur,
            dateMouvement: new Date(),
            typeArticle,
            unite:piece,
            userId:req.userId,
            articleId: article.id
        });



        res.status(201).json({msg: "Article created successfully"})
    } catch (error) {
        res.status(500).json({msg: error.message})
        console.log(error.message)
    }
}


const updateArticles = async(req, res)=>{
    try {
        const article = await Article.findOne({
            where: {
                uuid: req.params.id
            }
        })
        
        if(!article) return res.status(400).json({msg: "Article not found"})
            
            const {design, obs , fournisseur, typeArticle, piece, quantite, date} = req.body;
           
            // if(req.role === "admin"){
              await Article.update({design, obs , fournisseur, typeArticle, piece, quantite, date},
                {
                    where: {
                        id: article.id
                    }
                }
              );
            // } 
            // else{
            //     if(req.userId !== article.userId) return res.status(403).json({msg: "Access denied"})
            //     await Article.update({design, obs , fournisseur, typeArticle, piece, quantite, date},{
            //         where:{
            //             [Op.and]:[{id: article.id} , {userId:req.userId}] 
            //         },
            //     });
            //  }
            res.status(200).json({msg: "Article updated successfully"})
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}


const deleteArticles = async(req, res)=>{

    try {
        const article = await Article.findOne({
            where: {
                uuid: req.params.id
            }
        })
        
        if(!article) return res.status(400).json({msg: "Article not found"})
            
            const {name, price} = req.body;
           
            // if(req.role === "admin"){
                await Article.destroy({
                    where: {
                      id: article.id
                    }
                  });
                  
            // } else{
            //     if(req.userId !== Article.userId) return res.status(403).json({msg: "Access denied"})
            //     await Article.destroy({name, price},{
            //         where:{
            //             [Op.and]:[{id: Article.id} , {userId:req.userId}]
            //         },
            //     });
            //  }
            res.status(200).json({msg: "Article destroyed successfully"})
    } catch (error) {
        res.status(500).json({msg: error.message})
    }

}

export{
    getArticleById,
    getArticles, 
    createArticles,
    updateArticles, 
    deleteArticles
}

