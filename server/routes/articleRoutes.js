import express from 'express'
import { verifyUser } from "../midleware/AuthUser.js";


import { 
    getArticleById,
    getArticles, 
    createArticles,
    updateArticles, 
    deleteArticles
 } from "../controllers/venteController.js";

 const router = express.Router();

router.get('/articles',verifyUser , getArticles);
router.get('/article/:id',verifyUser , getArticleById );
router.post('/article',verifyUser , createArticles)
router.patch('/article/:id',verifyUser , updateArticles)
router.delete('/article/:id',verifyUser , deleteArticles)

export default router;