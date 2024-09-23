import {getMax, getMin, updateVente , addVente , getAllVente , getOneVente , deleteVente } from '../controllers/venteController.js'
import express from 'express'
const router =express.Router()

router.get('/maxprice' , getMax)
router.get('/minprice' ,getMin)
router.put('/:id' , updateVente)
router.post('/addVente' ,addVente)
router.get('/allVente' , getAllVente)
router.get('/:id' , getOneVente)
router.delete('/:id' , deleteVente)
    

export default router