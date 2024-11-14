import express from 'express'
import {
    entranceMouvement,
    exitMouvement,
    getAllMouvement,
    getEntranceMouvement,
    getExitMouvement,
    getLeastUsedArticles,
    getMouvementEntranceExit,
    getTopUsedArticles,
    getTotalMouvement,
    mouvementInByIdd ,
    mouvementOutByIdd,
    getMovementsByDateAndTypeEntree,
    getMovementsBySingleDate,
    getMovementsBySingleDateExit,
    getMovementsByDateAndTypeExit,
    getInkConsumptionByPAC
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

//routes for the charts
router.get('/getThemostUsedArticles',verifyUser, getTopUsedArticles)
router.get('/getLeastUsedArticles',verifyUser, getLeastUsedArticles)
router.get('/getTotalMouvement'  ,  getTotalMouvement) 

router.post('/getMovementsByDateAndTypeEntree', getMovementsByDateAndTypeEntree)
router.post('/getMovementsByOneDateAndTypeEntree', getMovementsBySingleDate)

router.post('/getMovementsByDateAndTypeExit', getMovementsByDateAndTypeExit)
router.post('/getMovementsByOneDateAndTypeExit', getMovementsBySingleDateExit)

router.get('/getInkConsumptionByPAC'  ,  getInkConsumptionByPAC) 


export default router;
