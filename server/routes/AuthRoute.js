import express from 'express'
import { logOut, Me, Login } from '../controllers/AuthController.js';



const router = express.Router();

router.get('/me' , Me);
router.post('/login' , Login)
router.delete('/logout' , logOut)

export default router;