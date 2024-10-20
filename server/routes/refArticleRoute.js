import { getNextRefArticle } from "../controllers/refArticleController.js";

import express from 'express'
const router = express.Router()


router.get('/getNextRefArticle', getNextRefArticle);
export default router