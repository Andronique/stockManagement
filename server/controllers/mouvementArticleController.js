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



const getTopUsedArticles = async (req, res) => {
  try {
    const topArticles = await Mouvement.findAll({
      where: { typeMouvement: 'sortie' }, // On compte les sorties pour mesurer l'utilisation
      attributes: [
        [Sequelize.col('Article.design'), 'nomArticle'], // Récupère le nom de l'article
        [Sequelize.fn('SUM', Sequelize.col('Mouvement.quantite')), 'totalUsage'] // Somme de la quantité utilisée
      ],
      group: ['Article.id'], // Groupement par article
      order: [[Sequelize.literal('totalUsage'), 'DESC']], // Trie par total d'utilisation décroissant
      limit: 4, // Limite aux 4 articles les plus utilisés
      include: [{
        model: Article,
        attributes: [] // Évite d'ajouter d'autres attributs du modèle Article
      }]
    });

    res.status(200).json(topArticles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des articles les plus utilisés' });
  }
};

const getLeastUsedArticles = async (req, res) => {
  try {
    const leastUsedArticles = await Mouvement.findAll({
      where: { typeMouvement: 'sortie' }, // On considère les sorties comme mesure d'utilisation
      attributes: [
        [Sequelize.col('Article.design'), 'nomArticle'], // Récupère le nom de l'article
        [Sequelize.fn('SUM', Sequelize.col('Mouvement.quantite')), 'totalUsage'] // Somme de la quantité utilisée
      ],
      group: ['Article.id'], // Groupement par article
      order: [[Sequelize.literal('totalUsage'), 'ASC']], // Trie par total d'utilisation croissant
      limit: 4, // Limite aux 4 articles les moins utilisés
      include: [{
        model: Article,
        attributes: [] // Exclut les autres attributs du modèle Article
      }],
      raw: true // Retourne des données brutes
    });

    res.status(200).json(leastUsedArticles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des articles les moins utilisés' });
  }
};


const getTotalMouvement = async (req, res) => {
  try {
    const totalUsers = await Mouvement.count(); // Compte le nombre total d'utilisateurs
    res.status(200).json(totalUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération du nombre total d\'utilisateurs' });
  }
};




const getMovementsByDateAndTypeEntree = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    console.log("Dates reçues:", startDate, endDate);
    
    let whereClause = {};
        // Ajouter un jour à endDate si les deux dates sont fournies


    if (startDate && endDate) {
      
      // Recherche entre deux dates
      whereClause.dateMouvement = {
        [Op.between]: [startDate, endDate]
      };
    } else if (startDate || endDate){
      // Recherche avec une seule date
      whereClause.dateMouvement = {
        [Op.eq]: startDate || endDate // Utilise l'une des deux dates si disponible
      };
    }

    const movements = await Mouvement.findAll({
      where: {
        typeMouvement: 'entree',
        ...whereClause
      },
      include: [
        {
          model: Article,
        }
      ]
    });

    res.status(200).json(movements);
  } catch (error) {
    console.error("Erreur lors de la récupération des mouvements:", error);
    res.status(500).json({ error: "Erreur lors de la récupération des mouvements" });
  }
};

// search by date for movement entree

const getMovementsByDateAndTypeEntre = async (req, res) => {
  try {
  const { startDate, endDate } = req.body;
  console.log(startDate , endDate)
  let whereClause = {};

  if (startDate && endDate) {
    // Recherche entre deux dates
    whereClause.dateMouvement = {
      [Op.between]: [startDate, endDate]
    };
  } else if (startDate) {   
    // Recherche avec seulement startDate
    whereClause.dateMouvement = {
      [Op.gte]: startDate
    };
  } else if (endDate) {
    // Recherche avec seulement endDate
    whereClause.dateMouvement = {
      [Op.lte]: endDate
    };
  }

 
    const movements = await Mouvement.findAll({
      where: {
        typeMouvement: 'entree',
        ...whereClause
      },
      include: [
        {
          model: Article,
        }
      ]
    });

    res.status(200).json(movements);
  } catch (error) {
    console.error("Erreur lors de la récupération des mouvements:", error);
    console.log(error.message)
    res.status(500).json({ error: "Erreur lors de la récupération des mouvements" });
  }
};


// search by one date
const getMovementsBySingleDate = async (req, res) => {
  try {
    const { date } = req.body; // Utiliser "date" comme clé unique dans le body

    if (!date) {
      return res.status(400).json({ error: "La date doit être fournie" });
    }

    const movements = await Mouvement.findAll({
      where: {
        typeMouvement: 'entree',
        dateMouvement: {
          [Op.eq]: date
        }
      },
      include: [
        {
          model: Article,
        }
      ]
    });
    res.status(200).json(movements);
  } catch (error) {
    console.error("Erreur lors de la récupération des mouvements:", error);
    res.status(500).json({ error: "Erreur lors de la récupération des mouvements" });
  }
};


// search by date for movement sortie
const getMovementsByDateAndTypeExit = async (req, res) => {
  try {
  const { startDateExit, endDateExit } = req.body;
  console.log(startDateExit , endDateExit)
  let whereClause = {};

  if (startDateExit && endDateExit) {
    // Recherche entre deux dates
    whereClause.dateMouvement = {
      [Op.between]: [startDateExit, endDateExit]
    };
  } else if (startDateExit) {   
    // Recherche avec seulement startDate
    whereClause.dateMouvement = {
      [Op.gte]: startDateExit
    };
  } else if (endDateExit) {
    // Recherche avec seulement endDate
    whereClause.dateMouvement = {
      [Op.lte]: endDateExit
    };
  }

const movements = await Mouvement.findAll({
      where: {
        typeMouvement: 'sortie',
        ...whereClause
      },
          include:[{
                model: Article,
                attributes:['ref','obs']
            },{
                model: Detenteur,
                attributes:['id','post']
            }]
});

    res.status(200).json(movements);
  } catch (error) {
    console.error("Erreur lors de la récupération des mouvements:", error);
    console.log(error.message)
    res.status(500).json({ error: "Erreur lors de la récupération des mouvements" });
  }
};


// search by one date
const getMovementsBySingleDateExit = async (req, res) => {
  try {
    const { date } = req.body; // Utiliser "date" comme clé unique dans le body

    if (!date) {
      return res.status(400).json({ error: "La date doit être fournie" });
    }

    const movements = await Mouvement.findAll({
      where: {
        typeMouvement: 'sortie',
        dateMouvement: {
          [Op.eq]: date
        }
      },
      include: [
        {
          model: Article,
        }
      ]
    });
    res.status(200).json(movements);
  } catch (error) {
    console.error("Erreur lors de la récupération des mouvements:", error);
    res.status(500).json({ error: "Erreur lors de la récupération des mouvements" });
  }
};

const getInkConsumptionByPAC = async (req, res) => {
  try {
    const inkConsumption = await Mouvement.findAll({
      where: {
        typeMouvement: 'sortie',
      },
      include: [
        {
          model: Article,
          where: {
            design: 'Encre',
          },
          attributes: [] // Exclude other attributes of `Article` to optimize query
        }
      ],
      attributes: [
        'beneficiaire',
        [Sequelize.fn('SUM', Sequelize.col('Mouvement.quantite')), 'totalEncreConsommée']
      ],
      group: ['beneficiaire']
    });

    // Format the data to convert totalEncreConsommée to a number
    const formattedData = inkConsumption.map(item => ({
      beneficiaire: item.beneficiaire,
      totalEncreConsommée: Number(item.getDataValue('totalEncreConsommée')) // Convert to number
    }));

    res.status(200).json(formattedData);
  } catch (error) {
    console.error("Erreur lors de la récupération de la consommation d'encre:", error);
    res.status(500).json({ error: error.message });
  }
};


      


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
    updateEntranceMouvement,
    getTopUsedArticles,
    getLeastUsedArticles,
    getTotalMouvement,
    getMovementsByDateAndTypeEntree,
    getMovementsBySingleDate,
    getMovementsByDateAndTypeExit,
    getMovementsBySingleDateExit,
    getInkConsumptionByPAC
}

