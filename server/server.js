import express  from 'express'
import cors from 'cors'
const app= express();
const port =3002;


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//App router
import routerVente from './routes/productRoutes.js';
import routerMouvement from './routes/mouvementRoutes.js';
import routerArticle from './routes/articleRoutes.js'
import routerDetenteur from './routes/detenteurRoutes.js';


app.use('/api/ventes' , routerVente)
app.use('/api/articles' , routerArticle)
app.use('/api/mouvements' , routerMouvement)
app.use('/api/detenteurs' , routerDetenteur)


app.get('/post' , (req , res)=>{
    res.json({message: "voici le podsdsdsdst"})
})

app.listen(port , ()=>console.log('server is running'))
