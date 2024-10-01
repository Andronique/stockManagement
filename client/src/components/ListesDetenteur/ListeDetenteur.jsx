
import React , {useEffect, useState}from 'react'
import './listeDetenteur.css'
import { FaTrash } from "react-icons/fa6";
import { FaEdit, FaRegWindowClose } from "react-icons/fa";
import { GrValidate } from 'react-icons/gr';
import { TiCancel } from 'react-icons/ti';
import axios from 'axios';

function ListeDetenteur() {

    const [ajoutData , setDatajout] = useState(false)
    const [modifModale , setModifModale] = useState(false)
    const [allData, setAllData] = useState([]);
    const [name, setname] = useState(null);
    const [id, setid] = useState(null);
    const [suppModale, setsuppModale] = useState(true);

    useEffect(()=> {
        getAlldetenteur();
    }, [])
    
    // ================= talk to server =========
    const ajoutDetenteur= async (e) => {
        e.preventDefault()
        const data = {
            name: name,
        }
        console.log(data)
        const res = await fetch('http://localhost:3002/api/detenteurs/addDetenteur' , {
          method: "POST",
          headers: {"Content-Type" : "application/json"},
          body:JSON.stringify(data)
      })
      getAlldetenteur();
      setDatajout(false)
      emptyData();
    }

    const modifDetenteur= async (e) => {
        e.preventDefault();
        const idDtenteur = id
        const data = {
            name: name,
        }
        console.log(data)
        const res = await fetch(`http://localhost:3002/api/detenteurs/${idDtenteur}` , {
          method: "PUT",
          headers: {"Content-Type" : "application/json"},
          body:JSON.stringify(data)
      })
      getAlldetenteur();
      setModifModale(false)
      emptyData();
    }

    const deleteDetenteur = async (idDtenteur)=>{
        const res = await fetch(`http://localhost:3002/api/detenteurs/${idDtenteur}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        getAlldetenteur();
        
    }

    const emptyData  = ()=>{
        setname('');
    }

    const getDataModif =(d)=>{
        setModifModale(true);
      const {detenteur , id}  = d;
      
      setid(id);
      setname(detenteur);
    }
    const getAlldetenteur = ()=>{
        axios
        .get('http://localhost:3002/api/detenteurs/allDetenteur')
        .then((res) => setAllData(res.data))
        .catch((err) => console.log(err));
    }






  const customStyles = {
    control: (provided) => ({
      ...provided,
      padding: '5px',   
      margin: '10px 0', 
      fontSize: '16px', 
    }),
    option: (provided) => ({
      ...provided,
      fontSize: '16px', // Change font size of the dropdown options
      padding: '10px',  // Adjust padding for the dropdown options
    })
  };

  const handleChange = (selected)=>{
      setselectedOption(selected)
  }
  const cancel= ()=>{
      emptyData();
      setModifModale(false)
  }

  

  return (
    <div className='container-detenteur'>
       {/* <h1>Listes des detenteurs</h1>
      <div style={{maxWidth:"200px"}}>
       <Select 
          options={options}
          value={selectedOption}
          onChange={handleChange}
       />
      </div> */}

      <div className="wrapper_form_detenteur">
        <form action="" className='form_detenteur'>
            <div className='row'>
                <label htmlFor="nom"></label>
            </div>
        </form>
      </div>


      <div className="table">
        <div className="talbe_header">
            <h1 className='titleOne'>Listes des détenteurs</h1>
            <div>
                <input type="text" placeholder='Post' />
                <button className="add_new" onClick={()=>setDatajout(true)}>+ Ajouter</button>
            </div>

        </div>

        <div className="table_section">
            <table>
                <thead>
                    <tr>
                        <td>Détenteur</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    { allData.map((d,i) => (<tr className='row' key={i}>
                        
                        <td><strong> {i+1} </strong>{d.detenteur}</td>
                 
                        <td > 
                            <span className='tdbtns'>
                            <button onClick={() => { setModifModale(true); getDataModif(d); }}><FaEdit  className='icon'/></button>
                            <button onClick={() => {  setsuppModale(true); setid(d.id)}}> <FaTrash  className='icon'/> </button>
                            </span>
                        </td>
                    </tr>))}
                  
                </tbody>
            </table>
        </div>
    </div>


    {ajoutData &&   
    <div className='wrapperModale'> 
        <div className=" formAddDetenteur">
           <div className="headformDetenteur ">
             <h1>Nouveau Detenteur </h1>
             <FaRegWindowClose onClick={()=>setDatajout(false)} className='icon pointeur text-danger-hover' />
           </div>
      

         <div className="bodyformDetenteur ">
              <div className="row">
                 <div className="column">
                  <label htmlFor="detenteur">Detenteur</label>
                  <input value={name} onChange={(e)=>setname(e.target.value)} type="text" name='detenteur' placeholder='Post' />
                 </div>
              </div>
              <hr style={{margin:"4px"}} />
              <div className="flex">
                <div className="column">
                    <button className="btn primary flex" onClick={ajoutDetenteur}> <GrValidate className='icon' /> Valider</button >
                 </div>
                 <div className="column">
                    <button className=" danger btn text-white p-1 flex"> <TiCancel className='icon' /> Annuler</button >
                 </div>
              </div> 
         </div>
        </div>
     </div>
    }
    {modifModale &&   
    <div className='wrapperModale'> 
        <div className=" formAddDetenteur">
           <div className="headformDetenteur ">
             <h1>Nouveau Detenteur </h1>
             <FaRegWindowClose onClick={()=>setModifModale(false)} className='icon pointeur text-danger-hover' />
           </div>
      
         <div className="bodyformDetenteur ">
              <div className="row">
                 <div className="column">
                  <label htmlFor="detenteur">Detenteur</label>
                  <input value={name} onChange={(e)=>setname(e.target.value)} type="text" name='detenteur' placeholder='Post' />
                 </div>
              </div>
              <hr style={{margin:"4px"}} />
              <div className="flex">
                 <div className="column">
                    <button  className="btn primary flex" onClick={modifDetenteur} > <GrValidate className='icon' />Modifier</button >
                 </div>
                 <div className="column">
                    <button  onClick={()=> {setModifModale(false); emptyData()}} className=" danger btn text-white p-1 flex"> <TiCancel className='icon' /> Annuler</button >
                 </div>
              </div> 
         </div>
        </div>
     </div>
    }

    {suppModale &&   
    <div className='wrapperModale'> 
        <div className=" formAddDetenteur">
           <div className="headformDetenteur ">
             <h1>Suppression </h1>
             <FaRegWindowClose onClick={()=>setsuppModale(false)} className='icon pointeur text-danger-hover' />
           </div>
           <div className="bodyformDetenteur ">
              <div className="row">
                 <div className="column">
                  <p className='parasupp'>Voulez-vous continuer la suppression ?</p>
                 </div>
              </div>
              <div className="flex">
                 <div className="column">
                    <button  className="btn primary flex" onClick={()=>{deleteDetenteur(id); setsuppModale(false)}} > <GrValidate className='icon' />Oui</button >
                 </div>
                 <div className="column">
                    <button  onClick={()=> {setsuppModale(false); emptyData()}} className=" danger btn text-white p-1 flex"> <TiCancel className='icon' /> Nom</button >
                 </div>
              </div> 
           </div>
        </div>
     </div>
    }
    </div>
  )
}

export default ListeDetenteur
