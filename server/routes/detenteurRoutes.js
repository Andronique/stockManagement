import { deleteDetenteur ,
         getAllDetenteur,
         getOneDetenteur,
         addDetenteur,
         updateDetenteur,
        } from '../controllers/detenteurController.js'


import express from 'express'
const router =express.Router()

router.put('/:id' , updateDetenteur)
router.post('/addDetenteur' ,addDetenteur)
router.get('/allDetenteur' , getAllDetenteur)
router.get('/:id' , getOneDetenteur)
router.delete('/:id' , deleteDetenteur)
    

export default router
