
import axios from 'axios';
import { format } from 'date-fns';
import React, { useEffect  , useState , useRef } from 'react'
import './mouvement.css'
import "../entree/entree.css"
import { FaEdit, FaPrint, FaRegWindowClose, FaTrash } from 'react-icons/fa';
import { GrValidate } from 'react-icons/gr';
import { TiCancel } from 'react-icons/ti';
import Select from 'react-select';
import { IoSearchSharp } from 'react-icons/io5';
import { FaArrowRightLong } from "react-icons/fa6";

import html2pdf from 'html2pdf.js';

function Mouvement() {
  const pdfRef = useRef();
  const generatePDF = () => {
    const element = pdfRef.current;
    html2pdf()
      .set({
        margin: 0.4,
        filename: 'document.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a3', orientation: 'portrait' }
      })
      .from(element)
      .save();
  };


  const [entree, setEntree] = useState([]);
  const [exit, setExit] = useState([]);

  const [design , setDesign] = useState('');
  const [typeArticle, settypeArticle] = useState(null)
  const [quantite , setQantinte] = useState(null)
  const [numArticle , setNumArticle] = useState("")
  const [beneficiaire, setBeneficiaire] = useState(null);
  const [date, setDate] = useState('');
  const [detenteurs, setDetenteurs]= useState([]);
  const [detenteur, setDetenteur]= useState('');
  const [newQuantite, setNewQuantite] = useState(null);
  const [fournisseur, setFournisseur] = useState();
  const [uuid, setUuid] = useState('');


  const [showUpdateEntrance , setShowUpdateEntrance] = useState(false);
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


       /*********** Pagination Entrance **************/
       const [fechedEn , setFectchedEn] = useState(null);
       const [currentPageEn, setcurrentPageEn] = useState(1);
       const recordsPerPageEn = 4;
       const lastIndexEn = currentPageEn * recordsPerPageEn;
       const firstIndexEn = lastIndexEn - recordsPerPageEn;
   
       const recordsEn = fechedEn ? fechedEn.slice(firstIndexEn, lastIndexEn) : entree.slice(firstIndexEn, lastIndexEn);

       const npageEn = Math.ceil(entree.length / recordsPerPageEn);
       const numbersEn = [...Array(npageEn + 1).keys()].slice(1);
   
       function prevPageEn() {
         if (currentPageEn !== 1) {
           setcurrentPageEn(currentPageEn - 1);
         }
       }
       function changePageEn(id) {
         setcurrentPageEn(id);
       }
       function nexPageEn() {
         if (currentPageEn !== npageEn) {
           setcurrentPageEn(currentPageEn + 1);
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
         const filterDatabEn = (search) => {
          let fechedData;
        
          // Check if search is empty, if so use the original data
          if (search === '') {
            fechedData = exit;
          } else {
            // Filter based on multiple fields
            fechedData = entree.filter((item) => {
              return (
                item.design.toLowerCase().includes(search.toLowerCase())
              );
            });
          }
        
          // Update state with filtered data
          setFectchedEn(fechedData);
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
  const getDataModifEntrance =(d)=>{
      console.log(d)
      setShowUpdateEntrance(true);
      const {typeArticle,dateMouvement, fournisseur , design , quantite, piece , article , ref, uuid} = d
      setDesign(design);
      settypeArticle(typeArticle)
      setQantinte(quantite)
      setUnite(piece)
      setId(article.id);
      setNumArticle(ref)
      setFournisseur(fournisseur)
      setUuid(uuid);
      setData(dateMouvement)
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
        await getAllEntree();
        await getDetenteurs();
      };
      
      fetchData();
     
    }, []);
      const  getAllEntree = async()=>{
      await  axios
        .get('http://localhost:5000/getEntranceMouvement' , {
          withCredentials: true
        })
        .then((res) => {setEntree(res.data) ; console.log(res.data)})
        .catch((err) => console.log(err));
      }
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

        // ========== recherche entre deux dates Entree //========== 
        // for the entrance
        const [startDate, setStartDate] = useState(''); // Date de début 
        const [endDate, setEndDate] = useState('');     // Date de fin  
        const [movements, setMovements] = useState([]);  // Résultats de la recherche

        // for the entrance
        const [startDateExit, setStartDateExit] = useState(''); // Date de début 
        const [endDateExit, setEndDateExit] = useState('');     // Date de fin 
        const [movementsEntrance, setMovementsEntrance] = useState([]);  // Résultats de la recherche
        

        // Fonction pour effectuer la recherche en fonction des dates sélectionnées de type entree
        const handlerDatesearchEntrace  =async()=>{
          if(startDate && endDate){
           fetchMovements()
          } else if(startDate || endDate){
           fetchMovementsonedate();
          }
         }
        const fetchMovements = async () => {
          try {
            await axios.post(`http://localhost:5000/getMovementsByDateAndTypeEntree`,  {
                startDate: startDate || undefined, // Inclut startDate uniquement si elle est définie
                endDate: endDate || undefined       // Inclut endDate uniquement si elle est définie
              },{
              withCredentials: true
            }).then((res)=> {setEntree(res.data) ; console.log(entree)})
            .catch((error)=> console.log(error))
            
          } catch (error) {
            console.error("Erreur lors de la récupération des mouvements:", error);
          }
        };

        const fetchMovementsonedate = async (d) => {
          try {
            setStartDate(d)
            console.log(d)
            const date =d
            await axios.post(`http://localhost:5000/getMovementsByOneDateAndTypeEntree`,  {
                date
              },{
              withCredentials: true
            }).then((res)=> {setEntree(res.data) ; console.log(res.data)})
            .catch((error)=> console.log(error))
            
          } catch (error) {
            console.error("Erreur lors de la récupération des mouvements:", error);
          }
        };

        // Fonction pour effectuer la recherche en fonction des dates sélectionnées de type sortie
        const handlerDatesearchExit  =async()=>{
             if(startDateExit && endDateExit){
              fetchMovementsExit()
             } else if(startDateExit || endDateExit){
              fetchMovementsonedateSortie();
             }
        }
        
        // const fetchMovementsExit = async () => {
        //   try {
        //     await axios.post(`http://localhost:5000/getMovementsByDateAndTypeExit`,  {
        //         startDateExit: startDate || undefined, // Inclut startDate uniquement si elle est définie
        //         endDateExit: endDate || undefined       // Inclut endDate uniquement si elle est définie
        //       },{
        //       withCredentials: true
        //     }).then((res)=> {setExit(res.data) ; console.log(exit)})
        //     .catch((error)=> console.log(error))
            
        //   } catch (error) {
        //     console.error("Erreur lors de la récupération des mouvements:", error);
        //   }
        // };

        const fetchMovementsonedateSortie = async () => {
          try {
            const date = startDateExit || endDateExit
            await axios.post(`http://localhost:5000/getMovementsByOneDateAndTypeExit`,  {
                date
              },{
              withCredentials: true
            }).then((res)=> {setExit(res.data) ; console.log(res.data)})
            .catch((error)=> console.log(error))
            
          } catch (error) {
            console.error("Erreur lors de la récupération des mouvements:", error);
          }
        };
        const fetchMovementsExit = async () => {
          const data = {
            startDateExit:startDateExit|| undefined,
              endDateExit:endDateExit  || undefined
          }
          try {
            await axios.post(`http://localhost:5000/getMovementsByDateAndTypeExit`, data ,{
              withCredentials: true
            }).then((res)=> { setExit(res.data) ; console.log(res.data)})
            .catch((error)=> console.log(error))
            
          } catch (error) {
            console.error("Erreur lors de la récupération des mouvements:", error);
          }
        };

        const handlerAll =async()=>{
          setStartDate('')
          setStartDateExit('')
          setEndDate('')
          setEndDateExit('')

          setfeched('')
          setFectchedEn('')

          getAllEntree()
          getAllarticleSortie()
        }

      // ========= Printing table ========
      const handleOnClickPdf=async()=>{
        alert('dd')
        const html2pdf = await require('html2pdf.js')
        const element = document.querySelector('#table')
        html2pdf(element, {
          margin: 20
        })
      }
      
  return (
    <div className='mouvement'>
        <div className="wrapperHeadTable">
          <div className="btnsMouvement ">
            <button className={`btn ${ showEntrance === true ? "selectione" :"selectione disabled" } `}  onClick={()=>setShowEntrance(true)}>  <span>Entrée</span></button>
            <button className={`btn ${ showEntrance === false ? "red" :"disabled redflow" } `} onClick={()=>setShowEntrance(false)}> <span>Sortie</span></button>
          </div>
       {!showEntrance && (
                <div className="flex">
                <div className='flex search-betweenDate'>
                     <button id='btn' onClick={()=>handlerAll()}>Tous</button>
                     <input 
                       type="date"  className='searchInput'
                       value={startDateExit}
                       onChange={(e) => setStartDateExit(e.target.value)} 
                     />
             
                     <input 
                       type="date" 
                       value={endDateExit}
                       onChange={(e) => {setEndDateExit(e.target.value) ; }} 
                     />
                     <FaArrowRightLong className='icon pointeur' onClick={()=>handlerDatesearchExit()} />
                </div>
                <div className='headTable'>
                 <input type="text" className='searchInput' onChange={(e)=>filterDatab(e.target.value)} />
                 <IoSearchSharp  className='icon'/>
                </div>
               <div id='imprimer'>
                 <button className='printer' onClick={generatePDF}>
                  <span>Imprimer</span>  < FaPrint className='icone' />
                 </button>
               </div>
              </div>
        )} 
       {showEntrance && (
        <div className="flex">
          <div className='flex search-betweenDate'>
               <button id='btn' onClick={()=>handlerAll()}>Tous</button>
               <input 
                 type="date"  className='searchInput'
                 value={startDate}
                 onChange={(e) => setStartDate(e.target.value)} 
               />
       
               <input 
                 type="date" 
                 value={endDate}
                 onChange={(e) => {setEndDate(e.target.value) ; }} 
               />
               <FaArrowRightLong className='icon pointeur' onClick={()=>handlerDatesearchEntrace()} />
          </div>
          <div className='headTable'>
            <input type="text" className='searchInput' onChange={(e)=>filterDatabEn(e.target.value)} />
            <IoSearchSharp  className='icon' />
         </div>
         <div id='imprimer' >
           <button onClick={generatePDF} className='printer'><span>Imprimer</span>  < FaPrint className='icone' /> </button>
         </div>
        </div>
       )}
        </div>
       <div className='tableContainer'>
       { showEntrance && <div className='table'>

        <div className="table_section">
        <table ref={pdfRef}  id='table'>
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
                    <td colSpan="7" className='nodataFound'>Aucune donnée trouvée</td> {/* Adjust colSpan according to your table's columns */}
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
    <div className="table_section" ref={pdfRef}>
       <table >
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

export default Mouvement
