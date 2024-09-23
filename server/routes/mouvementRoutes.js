import { entranceMouvement , exitMouvement , mouvementSortie , listEntrnceMouvement , listExitMouvement ,getMouvementData} from '../controllers/mouvementController.js'
import express from 'express'
const router =express.Router()

router.post('/addMouvement' , entranceMouvement )
router.post('/exitMouvement' , exitMouvement)
router.get('/allMouvement' , mouvementSortie)
router.get('/entranceMouvement' , listEntrnceMouvement) 
router.get('/exitMouvement' , listExitMouvement)
router.get('/getMouvementDatas' , getMouvementData)

export default router;
