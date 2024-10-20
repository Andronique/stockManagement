import Detenteur from "../models/detenteurModel.js";
const getDetenteurs = async(req, res)=>{
    try {
        const response = await Detenteur.findAll({
            attributes:['id','uuid', 'post']
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
    
}
const getDetenteurById =async (req, res)=>{
    try {
        const response = await Detenteur.findOne({
            attributes:['id','uuid', 'name'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message});
    }

}
const createDetenteurs = async(req, res)=>{
    const {post} = req.body;
    try {
        await Detenteur.create({
            post:post
        });

        res.status(201).json({msg: "Detenteur registered successfully"})
    } catch (error) {
        res.status(500).json({msg: error.message});
    }

}
const updateDetenteurs = async(req, res)=>{
    const {post} = req.body;
    console.log('mandeha')
    const detenteur = await Detenteur.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!detenteur) return res.status(404).json({msg: "Detenteur notfound"});
    try {
        await Detenteur.update({
            post: post
        },{
            where:{
                id: detenteur.id
            }
        });
        res.status(200).json({msg: "Detenteur Updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }

}


const deleteDetenteur = async (req, res) => {
  try {
    // Find the detenteur by uuid
    const detenteur = await Detenteur.findOne({
      where: {
        uuid: req.params.id, // assuming req.params.id contains the uuid
      },
    });

    // If no detenteur is found
    if (!detenteur) {
      return res.status(404).json({ msg: "Detenteur not found" });
    }

    // Delete the detenteur by id
    await Detenteur.destroy({
      where: {
        id: detenteur.id, // using the id from the found detenteur
      },
    });

    // Success response
    res.status(200).json({ msg: "Detenteur Deleted" });
  } catch (error) {
    // Error response
    res.status(500).json({ msg: error.message });
  }
};


export{
    getDetenteurById,
    getDetenteurs, 
    createDetenteurs,
    updateDetenteurs, 
    deleteDetenteur
}