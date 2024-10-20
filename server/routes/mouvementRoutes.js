import express from 'express'
import {
    entranceMouvement,
    exitMouvement,
    getAllMouvement,
    getEntranceMouvement,
    getExitMouvement,
    getMouvementEntranceExit,
    mouvementInByIdd ,
    mouvementOutByIdd
 } from '../controllers/mouvementArticleController.js'
 import { verifyUser} from '../midleware/AuthUser.js';

const router =express.Router()

router.post('/entranceMouvement', verifyUser , entranceMouvement )
router.post('/exitMouvement', verifyUser , exitMouvement)
router.get('/getExitMouvement',verifyUser,  getExitMouvement)

router.get('/getEntranceMouvement', verifyUser , getEntranceMouvement) 
router.get('/getAllMouvement', verifyUser ,  getAllMouvement)
router.get('/getMouvementEntranceExit', verifyUser, getMouvementEntranceExit)
router.get('/mouvementInById/:id', verifyUser, mouvementInByIdd)
router.get('/mouvementOutById/:id', verifyUser, mouvementOutByIdd)

export default router;
