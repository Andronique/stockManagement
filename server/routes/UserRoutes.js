import express from 'express'
import { 
    getUserById,
    getUsers, 
    createUsers , 
    updateUsers, 
    deleteUser,
    getTotalUsers
} from '../controllers/Users.js';

import { verifyUser , adminOnly} from '../midleware/AuthUser.js';
import { getTotalDetenteur } from '../controllers/DenteurController.js';


const router = express.Router();

router.get('/users',verifyUser,adminOnly, getUsers);
router.get('/users/:id', verifyUser , adminOnly, getUserById );
router.post('/users' , verifyUser, adminOnly, createUsers)
router.patch('/users/:id' ,verifyUser, adminOnly,  updateUsers)
router.delete('/users/:id', deleteUser)
router.get('/getTotalUsers', getTotalUsers)

export default router;