import { deleteDetenteur,
         getDetenteurById, 
         getDetenteurs, 
         updateDetenteurs,
         createDetenteurs } from '../controllers/DenteurController.js'


import express from 'express'
const router =express.Router()
 
router.patch('/detenteurs/:id' , updateDetenteurs)
router.post('/detenteurs' ,createDetenteurs)
router.get('/detenteurs' , getDetenteurs)
router.get('/detenteurs/:id' , getDetenteurById)
router.delete('/detenteurs/:id' , deleteDetenteur)
    

export default router
