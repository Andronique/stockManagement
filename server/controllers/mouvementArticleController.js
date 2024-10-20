import Article from "../models/articleModel.js";
import { Op, where } from "sequelize";
import User from "../models/UserModel.js";
import { Sequelize } from "sequelize";
import Mouvement from "../models/mouvementArticle.js";
import Detenteur from "../models/detenteurModel.js";


const entranceMouvement =async(req, res)=>{

    try {
      
        const { id, quantite, fournisseur, design, typeArticle, unite ,numArticle} = req.body;       
        const mouvement = await Mouvement.create({
            typeMouvement: 'entree',
            ref:numArticle,
            quantite,
            design,
            dateMouvement: new Date(),
            fournisseur,
            typeArticle,
            unite,
            userId: req.userId,
            articleId: id
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
        const { id, quantite,  typeArticle, unite, beneficiaire, detenteurId ,numArticle , design} = req.body;    
        console.log(detenteurId)   
        const mouvement = await Mouvement.create({
            typeMouvement: 'sortie',
            ref: numArticle,
            quantite,
            design,
            dateMouvement: new Date(),
            beneficiaire,
            typeArticle,
            unite,
            userId: req.userId,
            articleId: id,
            detenteurId
        });
        // Update item quantity
        const article = await Article.findByPk(id);
            article.quantite = Number(article.quantite) - Number(quantite);
            await article.save();

        res.status(201).json(mouvement);
    } catch (error) {
        res.status(500).json({ error: 'Error creating stock movement ts mandeha' });
        console.log(error.message)
    }
}



const getAllMouvement=async(req, res)=>{
  try {
        let mouvement = await  Mouvement.findAll({})
        res.status(200).send(mouvement)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching Mouvement' });
  }
}

const getEntranceMouvement =async(req, res)=>{
    try {
        // Fetch all movements with type "entrée"
        const mouvements = await Mouvement.findAll({
            where: { typeMouvement: 'entree' },
            include:[{
                model: Article,
                attributes:['ref','obs']
            }]
        });
        // Return the fetched movements
        res.status(200).send(mouvements);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching entrée movements' });
    }
}


const getExitMouvement =async(req, res)=>{
    try {
        // Fetch all movements with type "entrée"
        const mouvements = await Mouvement.findAll({
            where: { typeMouvement: 'sortie' },
            include:[{
                model: Article,
                attributes:['ref','obs']
            },{
                model: Detenteur,
                attributes:['id','post']
            }]
        });
        // Return the fetched movements
        res.status(200).send(mouvements);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Error fetching entrée movements' });
    }
}


const getMouvementEntranceExit = async (req, res) => {
    try {
      const result = await Mouvement.findAll({       
        attributes: [
          'articleId',  // Group by articleId
          'design',
          'ref',
          'uuid',
  
          // Sum of entrance quantities (ENTREE)
          [Sequelize.literal(`SUM(CASE WHEN typeMouvement = 'entree' THEN quantite ELSE 0 END)`), 'total_entrance_quantity'],
  
          // Sum of exit quantities (SORTIE)
          [Sequelize.literal(`SUM(CASE WHEN typeMouvement = 'sortie' THEN quantite ELSE 0 END)`), 'total_exit_quantity'],
  
          // Rest quantity: (total_entrance - total_exit)
          [Sequelize.literal(`
            SUM(CASE WHEN typeMouvement = 'entree' THEN quantite ELSE 0 END) - 
            SUM(CASE WHEN typeMouvement = 'sortie' THEN quantite ELSE 0 END)
          `), 'rest_quantity']
        ],
        group: ['articleId', 'design'],  // Group by articleId and design
        raw: true  // Return raw data (plain objects)
      });
  
      // Send the result
      return res.status(200).json(result);
    } catch (error) {
      console.error('Error fetching movement data:', error.message);
      return res.status(500).json({ error: 'An error occurred while fetching movement data.' });
    }
  };



  const mouvementInByIdd = async (req, res) => {
    try {
      const mouvement = await Mouvement.findOne({
        where: {
          uuid: req.params.id
        }
      });
      console.log(mouvement)
      if (!mouvement) {
        return res.status(400).json({ msg: "Mouvement not found" });
      }
  
      let response;

        response = await Mouvement.findAll({
          where: { typeMouvement: 'entree', design: mouvement.design, ref: mouvement.ref },
          include: [
            {
              model: User,
              attributes: ['name', 'email']
            }
          ]
        });
      return res.status(200).json(response);
      
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: 'Something went wrong' });
    } 
  };
  // const mouvementInByIdd = async (req, res) => {
  //   console.log('mouvement In by id dia mandeha')
  //   try {
  //     const mouvement = await Mouvement.findOne({
  //       where: {
  //         uuid: req.params.id
  //       }
  //     });
  
  //     // Check if mouvement exists
  //     console.log(mouvement)
  //     if (!mouvement) {
  //       return res.status(400).json({ msg: "Mouvement not found" });
  //     }
  
  //     let response;
  //     // Handle 'sortie' typeMouvement
  //     if (mouvement.typeMouvement === 'sortie') {
  //       response = await Mouvement.findAll({
  //         where: { typeMouvement: 'sortie', design: mouvement.design },
  //         include: [
  //           {
  //             model: Article,
  //             attributes: ['ref', 'obs']
  //           }
            
  //         ]
  //       });
  //     } 
  //     // Handle 'entree' typeMouvement
  //     else {
  //       response = await Mouvement.findAll({
  //         where: { typeMouvement: 'entree', design: mouvement.design },
  //         include: [
  //           {
  //             model: User,
  //             attributes: ['name', 'email']
  //           }
  //         ]
  //       });
  //     }
  
  //     // Return the response with the fetched mouvements
  //     return res.status(200).json(response);
      
  //   } catch (error) {
  //     console.log(error.message);
  //     return res.status(500).json({ error: 'Something went wrong' });
  //   } 
  // };
  const mouvementOutByIdd = async (req, res) => {
    try {
      const mouvement = await Mouvement.findOne({
        where: {
          uuid: req.params.id
        }
      });
      console.log(mouvement)
      if (!mouvement) {
        return res.status(400).json({ msg: "Mouvement not found" });
      }
  
      let response;

        response = await Mouvement.findAll({
          where: { typeMouvement: 'sortie', design: mouvement.design, ref: mouvement.ref },
          include: [
            {
              model: User,
              attributes: ['name', 'email']
            }, 
            {
              model: Detenteur,
              attributes:['id' , 'post']
            }
            
          ]
        });
      return res.status(200).json(response);
      
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: 'Something went wrong' });
    } 
  };
  




const updateExitMouvement =async(req, res)=>{
  const mouvement = await Mouvement.findOne({
      where: {
          uuid: req.params.id
      }
  });
  if(!mouvement) return res.status(404).json({msg: "Mouvement non trouvé"});
  const { id, quantite,  typeArticle, unite, beneficiaire, detenteurId ,numArticle , design , oldQuantite} = req.body;    

   try {
      await Mouvement.update({
        typeMouvement: 'sortie',
        ref: numArticle,
        quantite,
        design,
        dateMouvement: new Date(),
        beneficiaire,
        typeArticle,
        unite,
        userId: req.userId,
        articleId: id,
        detenteurId
      },{
          where:{
              id: mouvement.id
          }
      });
 

        const article = await Article.findByPk(id);
        article.quantite =(Number(article.quantite) + Number(oldQuantite))+ Number(quantite) ;
        await article.save();



      res.status(200).json({msg: mouvement  });
  } catch (error) {
      res.status(400).json({msg: error.message});
  }
}
const updateEntranceMouvement =async(req, res)=>{
  const mouvement = await Mouvement.findOne({
      where: {
          uuid: req.params.id
      }
  });
  if(!mouvement) return res.status(404).json({msg: "Mouvement non trouvé"});
  const {id, quantite, fournisseur, design, typeArticle, unite ,numArticle , oldQuantite} = req.body;    

   try {
      await Mouvement.update({
        typeMouvement: 'entree',
        ref:numArticle,
        quantite,
        design,
        dateMouvement: new Date(),
        fournisseur,
        unite,
        userId: req.userId,
        articleId: id
      },{
          where:{
              id: mouvement.id
          }
      });

        const article = await Article.findByPk(id);
        article.quantite =(Number(article.quantite) - Number(oldQuantite))+ Number(quantite) ;
        await article.save();

      res.status(200).json({msg: mouvement});
  } catch (error) {
      res.status(400).json({msg: error.message});
  }
}
export {
    entranceMouvement,
    exitMouvement, 
    getAllMouvement,
    getEntranceMouvement,
    getExitMouvement,
    getMouvementEntranceExit,
    mouvementInByIdd,
    mouvementOutByIdd,
    updateExitMouvement,
    updateEntranceMouvement
}

