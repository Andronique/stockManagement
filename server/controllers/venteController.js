import { response } from "express"
import db from "../models/index.js"
import express from "express"
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// create main Model
const Vente = db.vente


// MAIN work

// 1. create vente

  const addVente = async(req , res) =>{
    const vente = await Vente.create({
        numProduit: req.body.numProduit,
        design: req.body.design, 
        price: req.body.price,
        quantity: req.body.quantity
    })
    res.status(200).send(vente)
}

// 2 get all ventes

const getAllVente = async (req, res)=>{
    let vente = await Vente.findAll({})
    res.status(200).send(vente)
}

// 3 get single product

const getOneVente= async (req, res)=>{
    let id  = req.params.id
    let vente = await Vente.findOne({ where: {id: id}})
    res.status(200).send(vente)
}


// 4 update single product

const updateVente = async (req, res)=>{
    let id  = req.params.id
    let vente = await Vente.update(req.body ,{ where: {id: id}})
    res.status(200).send(vente)
}


// 5 delete product

const deleteVente = async (req, res)=>{
    let id  = req.params.id
    let vente = await Vente.destroy({ where: {id: id}})
    res.status(200).send("Product is deleted ! ")
}

// 6 get Min
const getMin = async (req, res)=>{
   let min =  await Vente.min('price')
   if(min){
    // return res.status(200).send(min)
   }
}
const getMax = async (req, res)=>{
    const max = await Vente.max('id')
    res.status(200).send(max)
    console.log(max)
}


export {
    deleteVente,
    getAllVente,
    getOneVente,
    addVente,
    updateVente,
    getMin,
    getMax
}