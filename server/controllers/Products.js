import Product from "../models/ProductModal.js ";
import { Op, where } from "sequelize";
import User from "../models/UserModel.js";



const getProducts = async(req, res)=>{
    try {
        let response ;
        if(req.role === "admin"){
            response = await Product.findAll({
                attributes:['uuid', 'name', 'price'],
                include:[{
                    model:User,
                    attributes:['name','email']
                }]
            });
        } else{
            response = await Product.findAll({
                attributes:['uuid', 'name', 'price'],
                where:{
                    userId: req.userId,
                    attributes:['name','email']
                },
                include: [
                   { model:User}
                ]
            });
        }
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}
 

const getProductById = async(req, res)=>{
    try {
        const product = await Product.findOne({
            where: {
                uuid: req.params.id
            }
        })

        if(!product) return res.status(400).json({msg: "Product not found"})
        
            let response;
            if(req.role === "admin"){
                response = await Product.findOne({
                    attributes:['uuid', 'name', 'price'],
                    where:{
                        id: product.id
                    }, 
                    include:[{
                        model:User,
                        attributes:['name','email']
                    }]
                });
            } else{
                response = await Product.findAll({
                    attributes:['uuid', 'name', 'price'],
                    where:{
                        [Op.and]:[{id: product.id} , {userId:req.userId}] 
                    },
                    include:[{
                        model:User,
                        attributes:['name','email']
                    }]
                });
            }
            res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }

}


const createProducts =async (req, res)=>{
    const {name, price} = req.body;
    try {
        await Product.create({
             name: name,
             price: price,
             userId: req.userId
        });
        res.status(201).json({msg: "Product created successfully"})
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
     
}


const updateProducts = async(req, res)=>{
    try {
        const product = await Product.findOne({
            where: {
                uuid: req.params.id
            }
        })
        
        if(!product) return res.status(400).json({msg: "Product not found"})
            
            const {name, price} = req.body;
           
            if(req.role === "admin"){
              await Product.update({name, price},
                {
                    where: {
                        id: product.id
                    }
                }
              );
            } else{
                if(req.userId !== product.userId) return res.status(403).json({msg: "Access denied"})
                await Product.update({name, price},{
                    where:{
                        [Op.and]:[{id: product.id} , {userId:req.userId}] 
                    },
                });

             }
            res.status(200).json({msg: "Product updated successfully"})
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}
const deleteProducts = async(req, res)=>{

    try {
        const product = await Product.findOne({
            where: {
                uuid: req.params.id
            }
        })
        
        if(!product) return res.status(400).json({msg: "Product not found"})
            
            const {name, price} = req.body;
           
            if(req.role === "admin"){
              await Product.destroy({name, price},
                {
                    where: {
                        id: product.id
                    }
                }
              );
            } else{
                if(req.userId !== product.userId) return res.status(403).json({msg: "Access denied"})
                await Product.destroy({name, price},{
                    where:{
                        [Op.and]:[{id: product.id} , {userId:req.userId}]
                    },
                });
             }
            res.status(200).json({msg: "Product destroyed successfully"})
    } catch (error) {
        res.status(500).json({msg: error.message})
    }

}

export{
    getProductById,
    getProducts, 
    createProducts,
    updateProducts, 
    deleteProducts
}