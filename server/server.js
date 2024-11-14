import express  from 'express'
import cors from 'cors'
import session from 'express-session'
import SequelizeStore from 'connect-session-sequelize'
import dotenv from 'dotenv'
import db from './config/dbConfig.js'

import UserRoute from './routes/UserRoutes.js'
import AuthRoute from './routes/AuthRoute.js'
import DetenteurRoute from './routes/detenteurRoutes.js'
import Articlerouter from './routes/articleRoutes.js'
import refCounterRouter from './routes/refArticleRoute.js'
import mouvementRouter from './routes/mouvementRoutes.js'

dotenv.config()  
const app= express();
const port = process.env.PORT || 3002;

// (async()=>{ 
//     await db.sync();
// })();    

app.use(cors({ 
    credentials:true,
    origin: 'http://localhost:5173'
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))



const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
    db: db,
    checkExpirationInterval:7 * 24 * 60 * 60 * 1000, // Check every 15 minutes
    expiration:  7 * 24 * 60 * 60 * 1000, // 1 week expiration
});

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto',
        maxAge:7 * 24 * 60 * 60 * 1000 * 1000// 1 week in milliseconds
    }
}));

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(UserRoute)
app.use(AuthRoute)
app.use(DetenteurRoute) 
app.use(Articlerouter)
app.use(refCounterRouter)
app.use(mouvementRouter)

// store.sync();

app.listen(port , ()=>console.log('server is running on port' , port))
