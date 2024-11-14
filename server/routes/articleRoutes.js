import express from 'express'
import { verifyUser } from "../midleware/AuthUser.js";


import { 
    getArticleById,
    getArticles, 
    createArticles,
    updateArticles, 
    deleteArticles,
    getTotalArticles, getTopAndLeastUsedArticles, getArticleBySingleDate
 } from "../controllers/venteController.js";

 const router = express.Router();

router.get('/articles',verifyUser , getArticles);
router.get('/article/:id',verifyUser , getArticleById );
router.post('/article',verifyUser , createArticles)
router.patch('/article/:id',verifyUser , updateArticles)
router.delete('/article/:id',verifyUser , deleteArticles)
router.get('/getTotalArticles',getTotalArticles)
router.get('/getTopAndLeastUsedArticles',getTopAndLeastUsedArticles)
router.post('/getArticleBySingleDate',getArticleBySingleDate)

export default router;