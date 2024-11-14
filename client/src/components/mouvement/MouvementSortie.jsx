
import axios from 'axios';
import { format } from 'date-fns';
import React, { useEffect  , useState } from 'react'
import './mouvement.css'
import "../entree/entree.css"
import { FaEdit, FaRegWindowClose, FaTrash } from 'react-icons/fa';
import { GrValidate } from 'react-icons/gr';
import { TiCancel } from 'react-icons/ti';
import Select from 'react-select';
import { IoSearchSharp } from 'react-icons/io5';

function MouvementSortie() {
  const [entree, setEntree] = useState([]);

  const [design , setDesign] = useState('');
  const [typeArticle, settypeArticle] = useState(null)
  const [quantite , setQantinte] = useState(null)
  const [numArticle , setNumArticle] = useState("")
  const [beneficiaire, setBeneficiaire] = useState(null);
  const [date, setDate] = useState('');
  const [detenteurs, setDetenteurs]= useState([]);
  const [detenteur, setDetenteur]= useState('');
  const [newQuantite, setNewQuantite] = useState(null);
  const [uuid, setUuid] = useState('');


  const [showEntrance, setShowEntrance] = useState(false);
  const [showUpdateExit, setShowUpdateExit] = useState(false)


  const [idlist , setIdlist] = useState(null)
  const [unite, setUnite] = useState(null);
  const [id , setId] = useState(null)

    /*********** Pagination Exit **************/
    const [feched, setfeched] = useState(null);
    const [currentPage, setcurrentPage] = useState(1);
    const recordsPerPage = 4;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;

    const records = feched ? feched.slice(firstIndex, lastIndex)  : exit.slice(firstIndex, lastIndex);


    const npage = Math.ceil(exit.length / recordsPerPage);
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


      
         // ==========searching data Exit============
         const filterDatab = (search) => {
          let fechedData;
        
          // Check if search is empty, if so use the original data
          if (search === '') {
            fechedData = exit;
          } else {
            // Filter based on multiple fields
            fechedData = exit.filter((item) => {
              return (
                item.design.toLowerCase().includes(search.toLowerCase())
              );
            });
          }
        
          // Update state with filtered data
          setfeched(fechedData);
        };
        

  const handleChange = (selected)=>{
      setDetenteur(selected)
  }

  const getDataModifExit =(d)=>{
      console.log(d)
      setShowUpdateExit(true);
      const {typeArticle,dateMouvement, beneficiaire,  detenteur , design , quantite, piece , article , ref, uuid} = d
      setDesign(design);
      settypeArticle(typeArticle)
      setQantinte(quantite)
      setUnite(piece)
      setId(article.id);
      setNumArticle(ref)
      setBeneficiaire(beneficiaire)
      setDetenteur(detenteur.post)
      setUuid(uuid);
      setDate(dateMouvement)
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

    useEffect(() => {
      const fetchData = async () => {
        await getAllarticleSortie();
        await getDetenteurs()
      };
      
      fetchData();
    }, []);

      const  getAllarticleSortie =async()=>{
        await  axios
        .get('http://localhost:5000/getExitMouvement', {
          withCredentials: true
        })
        .then((res) => { setExit(res.data) ; console.log(res.data)})
        .catch((err) => console.log(err));
      }

      const getDetenteurs = async()=>{
        await axios.get('http://localhost:5000/detenteurs',{
           withCredentials: true
       })
       .then((res) => setDetenteurs(res.data))
       .catch((err) => console.log(err));
      }

      const optionDetenteurs = detenteurs.map((detenteur) => ({
        value: detenteur.id,
        label: detenteur.post,
      }));


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
    <div className='mouvement'>
        <div className="wrapperHeadTable">
        <div className="btnsMouvement ">
          <button className={`btn ${showEntrance===true ? "selectione" : "disabled"}`}  onClick={()=>setShowEntrance(true)}>  <span>Entree de stock</span></button>
          <button className={`btn ${showEntrance===true ? "disabled" : "selectione"}`} onClick={()=>setShowEntrance(false)}> <span>Sortie de stock</span></button>
       </div>
       {!showEntrance && (<div className='headTable'>
           <input type="text" className='searchInput' onChange={(e)=>filterDatab(e.target.value)} />
           <IoSearchSharp  className='icon'  />
       </div>)}

        </div>
       <div className='tableContainer'>
       { showEntrance && <div className='table'>

        <div className="table_section">
        <table  id='table'>
           <thead>
               <tr>
                   <td>Ref</td>
                   <td>Dates</td>
                   <td>Designation</td>
                   <td>Quantite</td>
                   <td>Unite</td>
                   <th>Fournisseur</th>
                   <td>Action</td>
               </tr>
           </thead>
           <tbody>
                {recordsEn.length === 0 ? (
                  <tr>
                    <td colSpan="8" className='nodataFound'>Aucune donnée trouvée</td> {/* Adjust colSpan according to your table's columns */}
                  </tr>
                     ) : (
                      recordsEn.map((d) => (
                         <tr
                           key={d.id}
                         >
                           <td>{d.article.ref}</td>
                           <td>{d.dateMouvement ? format(new Date(d.dateMouvement), 'dd/MM/yyyy') : 'N/A'}</td>
                           <td>{d.design}</td>
                           <td>{d.quantite}</td>
                           <td>{d.unite}</td>
                           <td>{d.fournisseur}</td>
                           <td > 
                            <span className='tdbtns'>
                            <button > <FaTrash  className='icon'/> </button>
                            <a onClick={()=>getDataModifEntrance(d)} ><FaEdit className='icon'/></a>
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
       <nav>
       <ul className="pagination flex">
         <li className="page-item btnpn">
           <span href="#" className="page-link" onClick={prevPageEn}>
             Précedent
           </span>
         </li>
         {numbersEn.map((n, i) => (
           <li key={i}
             className={`page-item ${currentPageEn === n ? "activated" : ""}`}
             onClick={() => changePageEn(n)}
           >
             {n}
           </li>
         ))}
         <li className="page-item btnpn ">
           <span className="page-link" onClick={nexPageEn}>
             Suivant
           </span>
         </li>
       </ul>
       </nav>

        </div>


       {showUpdateEntrance && ( <div className="wrapperModale">
        <div className="modalMouvement updateEntre"> 
        <div className="headformDetenteur ">
             <h1 className='titleOne'>Modification de sortie d'un article </h1>
             <FaRegWindowClose onClick={()=>setShowUpdateEntrance(false)} className='icon pointeur text-danger-hover' />
          </div>
        <div className="bodyform formUpdate">
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
      </div>
        </div>
       
       </div>
      )}  

       </div>}

       
      { !showEntrance && <div className='table'>
    <div className="table_section">
       <table>
           <thead>
               <tr  >
                   <td>Ref</td>
                   <td>Dates</td>
                   <td>Designation</td>
                   <td>Quantite</td>
                   <td>Unite</td>
                   <td>Detenteur</td>
                   <td>Beneficiaire</td>
                   <td>Action</td>
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
                         >
                           <td>{d.article.ref}</td>
                           <td>{d.dateMouvement ? format(new Date(d.dateMouvement), 'dd/MM/yyyy') : 'N/A'}</td>
                           <td>{d.design}</td>
                           <td>{d.quantite}</td>
                           <td>{d.unite}</td>
                           <td>{d.detenteur.post}</td>
                           <td>{d.beneficiaire}</td>
                           <td > 
                            <span className='tdbtns'>
                            <button > <FaTrash  className='icon'/> </button>
                            <a onClick={() => {   getDataModifExit(d); }}><FaEdit className='icon'/></a>
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

       <nav>
       <ul className="pagination flex">
         <li className="page-item btnpn">
           <span href="#" className="page-link" onClick={prevPage}>
             Précedent
           </span>
         </li>
         {numbers.map((n, i) => (
           <li key={i}
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

       {showUpdateExit && 
       <div className='wrapperModale'>
        <div></div>
        <div className=" modalMouvement">
           <div className="headformDetenteur ">
             <h1 className='titleOne'>Modification de sortie d'un article </h1>
             <FaRegWindowClose onClick={()=>setShowUpdateExit(false)} className='icon pointeur text-danger-hover' />
           </div>
           <div className="formUpdate">
           <div className="bodyform">
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
            </div>
           </div>
          
        </div>
       </div>
       }

       </div>}
       </div>
    </div>
  )
}

export default MouvementSortie
