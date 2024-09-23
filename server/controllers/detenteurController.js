import db from "../models/index.js"
import express from "express"
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// create main Model
const Detenteur = db.detenteur;

const addDetenteur =async(req, res)=>{
    try {
        const { name} = req.body;       
        const resultat = await Detenteur.create({
           detenteur: name
        });

        res.status(201).send(resultat);
    } catch (error) {
        res.status(500).json({ error: 'Error creating detenteur ts mandeha' });
    }
}

// 2 get all Detenteurs

const getAllDetenteur = async (req, res)=>{
    let resultat = await Detenteur.findAll({})
    res.status(200).send(resultat)
}

// 3 get single product

const getOneDetenteur= async (req, res)=>{
    let id  = req.params.id
    let resultat = await Detenteur.findOne({ where: {id: id}})
    res.status(200).send(resultat)
}


// 4 update single product

const updateDetenteur = async (req, res)=>{
    let id  = req.params.id
    const {name} = req.body
    let resultat = await Detenteur.update({detenteur : name} ,{ where: {id: id}})
    res.status(200).send(resultat)
}


// 5 delete product

const deleteDetenteur = async (req, res)=>{
    let id  = req.params.id
    let resultat = await Detenteur.destroy({ where: {id: id}})
    res.status(200).send("detenteur is deleted ! ")
}

export {
    deleteDetenteur,
    getAllDetenteur,
    getOneDetenteur,
    addDetenteur,
    updateDetenteur,
}