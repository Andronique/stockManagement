import { addArticle , getAllArticle , addArticleMouvement} from '../controllers/articleController.js'
import express from 'express'
const router =express.Router()

router.post('/addarticle' , addArticleMouvement)
router.get('/allArticle' ,getAllArticle)


export default router;