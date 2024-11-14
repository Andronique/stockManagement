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

  const [feched, setfeched] = useState(null);
  const [insuf, setInsuf] = useState(false);
  const [alldata , setData] = useState([])

    /*********** Pagination **************/
    const [currentPage, setcurrentPage] = useState(1);
    const recordsPerPage = 6;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;

    const records = feched ? feched.slice(firstIndex, lastIndex) : alldata.slice(firstIndex, lastIndex);


    const npage = Math.ceil(alldata.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);

    function prevPage() {
      if (currentPage !== 1) {
        setcurrentPage(currentPage - 1);
      }
    }
    function changePage(id) {
      setcurrentPage(id);
    }
    function nexPage() {
      if (currentPage !== npage) {
        setcurrentPage(currentPage + 1);
      }
    }

    // ==========searching data============
    const filterDatab = (search) => {
        let fechedData;
      
        // Check if search is empty, if so use the original data
        if (search === '') {
          fechedData = alldata;
        } else {
          // Filter based on multiple fields
          fechedData = alldata.filter((item) => {
            return (
              item.design.toLowerCase().includes(search.toLowerCase()) ||
              item.fournisseur.toLowerCase().includes(search.toLowerCase()) ||
              item.typeArticle.toLowerCase().includes(search.toLowerCase()) ||
              item.dateAquisition.toLowerCase().includes(search.toLowerCase())||
              item.piece.toLowerCase().includes(search.toLowerCase())
            );
          });
        }
      
        // Update state with filtered data
        setfeched(fechedData);
      };



  const [design , setDesign] = useState('');
  const [typeArticle, settypeArticle] = useState(null)
  const [quantite , setQantinte] = useState(null)
  const [numArticle , setNumArticle] = useState("")
  const [beneficiaire, setBeneficiaire] = useState(null);
  const [date, setDate] = useState('');
  const [detenteurs, setDetenteurs]= useState([]);
  const [detenteur, setDetenteur]= useState('');
  const [msg, setmsg] = useState();

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
    if(beneficiaire===''|| newQuantite==='' || detenteur==='' || date ===''){
        setmsg('Tous les champs doivent être remplis.')
        return
    }
    if( newQuantite > quantite ){
      setInsuf(true)
    } else {
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
    }
  getArticles();
  setmsg('')
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

const cancelHandler=()=>{
  emptyData();
  setmsg('');
  setShowUpdate(false)
}

const emptyData=()=>{
  setDesign('');
  settypeArticle('')
  setQantinte('')
  setUnite('')
  setId('');
  setNumArticle('');
  setDate('')
  setNewQuantite('')
  setDetenteur('')
  setBeneficiaire('')
}


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
                   <input disabled type="text" value={design} onChange={(e)=>setDesign(e.target.value)} name='designation' placeholder='designation' />
                 </div>
                 <div className="column">

                  <div className="labelMandatory">
                   <label htmlFor="designation">Bénéficiaire</label>
                   <span className='mandatory'>*</span>
                  </div>

                  <select value={beneficiaire} onChange={(e) => setBeneficiaire(e.target.value)}>
                    <option value="">PAC</option>
                    <option value="Pac Tana">Pac Antananarivo</option>
                    <option value="Pac Finanarantsoa">Pac Finanarantsoa</option>
                    <option value="Pac Toamasina">Pac Toamasina</option>
                    <option value="Pac Mahajange">Pac Mahajanga</option>
                    <option value="Pac Antsiranana">Pac Antsiranana</option>
                    <option value="Pac Toliara">Pac Toliara</option>
                  </select>
                 </div>

                 <div className="column flex1">
                   <div>
                     <div className="labelMandatory">
                      <label htmlFor="quantity">Quantité</label>
                      <span className='mandatory'>*</span>
                     </div>
                     <input type="number"  name='quantity' placeholder='0' value={newQuantite} onChange={(e)=>setNewQuantite(e.target.value)}  />
                   </div>
  
                   <div>
                     <label htmlFor="designation">Stock reel</label>
                     <input disabled type="text" name='designation' placeholder='stock reel' value={quantite} onChange={(e)=>setQantinte(e.target.value)} />
                   </div>
                 </div>

              </div>
              <div className="rowOne">
                <div className="column">
                    <div className="labelMandatory">
                     <label htmlFor="designation">Détenteur</label>
                     <span className='mandatory'>*</span>
                    </div>
                   
                   <Select 
                    options={optionDetenteurs}
                    value={detenteur}
                    onChange={handleChange}
                    styles={customStyles}
                   />
                </div>

                 <div className="column">
                    <div className="labelMandatory">
                     <label htmlFor="designation">Date</label>
                     <span className='mandatory'>*</span>
                    </div>
                    <input type="date" name='designation'  value={date} onChange={(e)=>setDate(e.target.value)} />
                 </div>

                 <div className="column flex1">
                   <div className="column">
                     <label htmlFor="unite">Unité</label>
                     <input disabled type="text" name='unite' value={unite} onChange={(e)=>setUnite(e.target.value)} placeholder='boite ou pièce' />
                   </div>

                   <div className="column">
                       <label htmlFor="designation">Type d'article</label>
                      <input disabled type="text" name='designation' placeholder='Type' value={typeArticle} onChange={(e)=>settypeArticle(e.target.value)} />
                   </div>
                 </div>
              </div>
              {msg && (<p className='showMessage'>{msg}</p>)}
              <div className="flex1">
                 <div className="column">
                    <button onClick={updateArticleHandler} className=" primary btn flex1" >  <GrValidate className='icon' /> <span> Valider</span> </button >
                 </div>
                 <div></div>
                 <div className="column">
                    <button  onClick={()=> cancelHandler()}
                     className=" danger text-white p-1 btn flex1"> <TiCancel className='icon' /> <span>Annuler</span> </button >
                 </div>
                 
              </div>
            </div>)}
      </div> 

      <div className='tableContainer'>
   
   <div className='wrapperHeadTable'>
       <div className='headTable'>
           <input type="text" className='searchInput' onChange={(e)=>filterDatab(e.target.value)} />
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
                   
               </tr>
           </thead>
           <tbody>
           {records.length === 0 ? (
             <tr>
               <td colSpan="7" className='nodataFound'>Aucune donnée trouvée</td> {/* Adjust colSpan according to your table's columns */}
             </tr>
                ) : (
                  records.map((d) => (
                    <tr
                      key={d.id}
                      className={`action ${d.id === idlist ? "selected" : ""}`} // Use empty string instead of null
                      onClick={() => {
                        setIdlist(d.id); editUpdate(d); setShowUpdate(true);
                      }}
                    >
                      <td>{d.ref}</td>
                      <td>{d.dateAquisition ? format(new Date(d.dateAquisition), 'dd/MM/yyyy') : 'N/A'}</td>
                      <td>{d.design}</td>
                      <td>{d.quantite}</td>
                      <td>{d.piece}</td>
                      <td>{d.typeArticle}</td>
                    </tr>
                  ))
                )}

           </tbody>
           <tfoot>
          
           </tfoot>
       
       </table>
       <hr />
        <nav>
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
       </nav>
    </div>
   </div>

     </div>


  {insuf &&   
    <div className='wrapperModale'> 
        <div className=" modal">
           <div className="headformDetenteur ">
             <h1 className='titleOneSupp' >Notification </h1>
             <FaRegWindowClose onClick={()=>setInsuf(false)} className='icon pointeur text-danger-hover' />
           </div>
           <div className="bodyformDetenteur ">
              <div className="row">
                 <div className="column">
                  <p className='parasupp center'>La quantité réel est insuffisant.</p>
                 </div>
              </div>
          
           </div>
        </div>
     </div>
    }
    </div>
  )
}

export default Sortie





