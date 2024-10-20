import './sortie.css'
import React, {useEffect, useState} from 'react';
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
import Select from 'react-select';

function Sortie() {
  const [design , setDesign] = useState('');
  const [typeArticle, settypeArticle] = useState(null)
  const [quantite , setQantinte] = useState(null)
  const [numArticle , setNumArticle] = useState("")
  const [beneficiaire, setBeneficiaire] = useState(null);
  const [date, setDate] = useState('');
  const [detenteurs, setDetenteurs]= useState([]);
  const [detenteur, setDetenteur]= useState('');



  const [alldata , setData] = useState([])
  const [idlist , setIdlist] = useState(null)
  const [unite, setUnite] = useState(null);
  const [id , setId] = useState(null)
  const [newQuantite, setNewQuantite] = useState(null);

  const [showUpdate, setShowUpdate] = useState(false)

  const handleChange = (selected)=>{
    setDetenteur(selected)
  }


  const editUpdate=(data)=>{
    const {typeArticle, design , quantite, piece , id , ref} = data
    setDesign(design);
    settypeArticle(typeArticle)
    setQantinte(quantite)
    setUnite(piece)
    setId(id);
    setNumArticle(ref)
}

const updateArticleHandler = async (e) => {
    e.preventDefault()
    const {value} = detenteur
    console.log(detenteur)
    const data = {
        design: design,
        numArticle: numArticle,
        typeArticle: typeArticle,
        quantite: newQuantite,
        unite: unite,
        beneficiaire: beneficiaire,
        detenteurId:value,
        id:id,
    }
    console.log(data)
    const res = await axios.post('http://localhost:5000/exitMouvement' , data, {
      withCredentials:true
    })
  getArticles();
}

const getArticles = async()=>{
  await axios.get('http://localhost:5000/articles',{
     withCredentials: true
 })
 .then((res) => {setData(res.data) ; console.log(res.data)})
 .catch((err) => console.log(err))
}    

const getDetenteurs = async()=>{
  await axios.get('http://localhost:5000/detenteurs',{
     withCredentials: true
 })
 .then((res) => setDetenteurs(res.data))
 .catch((err) => console.log(err));
}




useEffect(() => {
  const fetchData = async () => {
    await getArticles();
    await getDetenteurs();
  };
  
  fetchData();
}, []);

const optionDetenteurs = detenteurs.map((detenteur) => ({
  value: detenteur.id,
  label: detenteur.post,
}));
console.log(optionDetenteurs)

const customStyles = {
  control: (provided) => ({
    ...provided,
    border: '1px solid black',
    fontSize: '15px',
    backgroundColor: 'white',
    color: 'black',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#ddd' : 'white',
    color: state.isSelected ? 'black' : 'black',
    fontSize: '15px',
    padding: '10px',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'black',
    fontSize: '15px',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'gray',
    fontSize: '15px',
  }),
};


  return (
    <div className='containerArticle'>
      <div className="formUpdate">
        <div className="headform">
          <h1 className='titleOne'>Sortie des article</h1>
          <FaAngleDown onClick={ ()=>setShowUpdate(!showUpdate)}  className={`icon ${showUpdate ? "clicked" : null}`} />
        </div>
            {showUpdate && (<div className="bodyform">
              <div className="rowStart">
                 <div className="column">
                   <label htmlFor="designation">Designation</label>
                   <input type="text" value={design} onChange={(e)=>setDesign(e.target.value)} name='designation' placeholder='designation' />
                 </div>
                 <div className="column">  
                   <label htmlFor="fournisseur">Béneficiaire</label>
                   <input type="text" value={beneficiaire} onChange={(e)=>setBeneficiaire(e.target.value)}   name='fournisseur' placeholder='Fournisseur' />
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

              </div>
              <div className="rowOne">
                <div className="column">
                   <label htmlFor="designation">Détenteur</label>
                   <Select 
                    options={optionDetenteurs}
                    value={detenteur}
                    onChange={handleChange}
                    styles={customStyles}
                   />
                </div>

                 <div className="column">
                   <label htmlFor="designation">Date</label>
                   <input type="date" name='designation'  value={date} onChange={(e)=>setDate(e.target.value)} />
                 </div>

                 <div className="column flex1">
                   <div className="column">
                     <label htmlFor="unite">Unité</label>
                     <input type="text" name='unite' value={unite} onChange={(e)=>setUnite(e.target.value)} placeholder='boite ou pièce' />
                   </div>

                   <div className="column">
                       <label htmlFor="designation">Type d'article</label>
                      <input type="text" name='designation' placeholder='Type' value={typeArticle} onChange={(e)=>settypeArticle(e.target.value)} />
                   </div>
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
                        <td> 
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
    </div>
   </div>

     </div>
    </div>
  )
}

export default Sortie





