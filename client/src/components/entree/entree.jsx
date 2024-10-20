import React , {useEffect, useState} from 'react'
import './entree.css'
import { FaAngleDown, FaEdit, FaTrash } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { LuView } from "react-icons/lu";
import { IoSearchSharp } from "react-icons/io5";
import { FaRegWindowClose } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import { GrValidate } from "react-icons/gr";
import { FaRegPlusSquare } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import axios from 'axios'
function Entree() {
  const [showUpdate, setShowUpdate] = useState(false)
  const [design , setDesign] = useState('');
  const [fournisseur ,  setFournisseur] = useState()
  const [typeArticle, settypeArticle] = useState(null)
  const [piece, setPiece] = useState(null)
  const [quantite , setQantinte] = useState(null)
  const [numArticle , setNumArticle] = useState('')
  const [alldata , setData] = useState([])
  const [date, setDate] = useState('');
  const [idlist , setIdlist] = useState(null)
  const [unite, setUnite] = useState(null);
  const [id , setId] = useState(null)
  const [newQuantite, setNewQuantite] = useState(null);


const getArticles = async()=>{
    await axios.get('http://localhost:5000/articles',{
       withCredentials: true
   })
   .then((res) => {setData(res.data) ; console.log(res.data)})
   .catch((err) => console.log(err))
}


const editUpdate=(data)=>{
  const {typeArticle, design , quantite, piece , id , ref} = data;
  setDesign(design);
  settypeArticle(typeArticle)
  setQantinte(quantite)
  setUnite(piece)
  setId(id);
  setNumArticle(ref);
}

const updateArticleHandler = async (e) => {
  e.preventDefault()
  const data = {
      design: design,
      numArticle: numArticle,
      fournisseur: fournisseur,
      typeArticle: typeArticle,
      quantite: newQuantite,
      unite: unite,
      id:id
  }
  console.log(data)
  const res = await axios.post('http://localhost:5000/entranceMouvement' , data, {
    withCredentials:true
  })
  getArticles();
}

useEffect(()=>{
  getArticles();
}, [])
  return (
    
    <div className='containerArticle'>
      <div className="formUpdate">
        <div className="headform">
          <h1 className='titleOne'>Mis à jour du stock des articles  </h1>
          <FaAngleDown onClick={ ()=>setShowUpdate(!showUpdate)}  className={`icon ${showUpdate ? "clicked" : null}`} />
        </div>
            {showUpdate && (<div className="bodyform">
              <div className="row">
                 <div className="column">
                  <label htmlFor="designation">Designation</label>
                  <input type="text" value={design} onChange={(e)=>setDesign(e.target.value)} name='designation' placeholder='designation' />
                 </div>
                 <div className="column">  
                   <label htmlFor="fournisseur">Fournisseur</label>
                   <input type="text" value={fournisseur} onChange={(e)=>setFournisseur(e.target.value)}   name='fournisseur' placeholder='Fournisseur' />
                 </div>
                 <div className="column flex1">
                 <div >
                   <label htmlFor="quantity">Quantité</label>
                   <input type="text"  name='quantity' placeholder='0' value={newQuantite} onChange={(e)=>setNewQuantite(e.target.value)}  />
                 </div>
                 <div>
                   <label htmlFor="designation">Stock reel</label>
                   <input type="text" name='designation' placeholder='stock reel' value={quantite} onChange={(e)=>setQantinte(e.target.value)} />
                 </div>
                 </div>

                 <div className="column">
                   <label htmlFor="designation">Date</label>
                   <input type="date" name='designation'  value={date} onChange={(e)=>setDate(e.target.value)} />
                 </div>

                 <div className="column">
                  <label htmlFor="designation">Type d'article</label>
                  <input type="text" name='designation' placeholder='Type' value={typeArticle} onChange={(e)=>settypeArticle(e.target.value)} />
                 </div>

                 <div className="column">
                  <label htmlFor="unite">Unité</label>
                  <input type="text" name='unite' value={unite} onChange={(e)=>setUnite(e.target.value)} placeholder='boite ou pièce' />
                 </div>
              </div>
              <div className="flex1">
                 <div className="column">
                    <button onClick={updateArticleHandler} className=" primary btn flex1" >  <GrValidate className='icon' /> <span> Valider</span> </button >

                 </div>
                 <div></div>
                 <div className="column">
                    <button 
                     className=" danger text-white p-1 btn flex1"> <TiCancel className='icon' /> <span>Annuler</span> </button >
                 </div>
                 
              </div>
            </div>)}
      </div> 

  <div className='tableContainer'>
   
   <div className='wrapperHeadTable'>
       <div className='headTable'>
           <input type="text" className='searchInput' />
           <IoSearchSharp  className='icon' />
       </div>

       <div className="button">
           <Link className='flex1 add_new' to={"/entree-article/ajout"}> +  Nouveau Article </Link>
       </div>

   </div>
   <div className="table">
     <div className='table_section'>
       <table>
           <thead>
               <tr>
                   <td>Ref</td>
                   <td>Dates</td>
                   <td>Designation</td>
                   <td>Stock_reel</td>
                   <td>Pièces</td>
                   <td>Types Articles</td>
                   <td>Action</td>
               </tr>
           </thead>
           <tbody>
           {alldata.length === 0 ? (
             <tr>
               <td colSpan="7" className='nodataFound'>Aucune donnée trouvée</td> {/* Adjust colSpan according to your table's columns */}
             </tr>
                ) : (
                  alldata.map((d) => (
                    <tr
                      key={d.id}
                      className={`action ${d.id === idlist ? "selected" : ""}`} // Use empty string instead of null
                      onClick={() => {
                        setIdlist(d.id); editUpdate(d)
                      }}
                    >
                      <td>{d.ref}</td>
                      <td>{d.dateAquisition ? format(new Date(d.dateAquisition), 'dd/MM/yyyy') : 'N/A'}</td>
                      <td>{d.design}</td>
                      <td>{d.quantite}</td>
                      <td>{d.piece}</td>
                      <td>{d.typeArticle}</td>
                      <td > 
                            <span className='tdbtns'>
                            <button > <FaTrash  className='icon'/> </button>
                            <Link to={`/entree-article/editArticle/${d.uuid}`} ><FaEdit  className='icon'/></Link>
                            </span>
                        </td>
                    </tr>
                  ))
                )}

           </tbody>
           <tfoot>
          
           </tfoot>
       
       </table>
       <hr />
       {/* <nav>
       <ul className="pagination flex">
         <li className="page-item btnpn">
           <span href="#" className="page-link" onClick={prevPage}>
             Précedent
           </span>
         </li>
         {numbers.map((n, i) => (
           <li
             className={`page-item ${currentPage === n ? "activated" : ""}`}
             onClick={() => changePage(n)}
           >
             {n}
           </li>
         ))}
         <li className="page-item btnpn ">
           <span className="page-link" onClick={nexPage}>
             Suivant
           </span>
         </li>
       </ul>
     </nav> */}
    </div>
   </div>

  </div>
</div>
  )
}

export default Entree

