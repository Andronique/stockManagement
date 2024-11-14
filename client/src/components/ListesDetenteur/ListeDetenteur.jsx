
import React , {useEffect, useState}from 'react'
import { FaTrash } from "react-icons/fa6";
import { FaEdit, FaRegWindowClose } from "react-icons/fa";
import { GrValidate } from 'react-icons/gr';
import { TiCancel } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './listeDetenteur.css'

function ListeDetenteur() {
    const [msg, setmsg] = useState(null);
    const [ajoutData , setDatajout] = useState(false)
    const [modifModale , setModifModale] = useState(false)
    const [detenteurs, setDetenteurs] = useState([]);
    const [post, setPost] = useState('');
    const [id, setid] = useState(null);
    const [suppModale, setsuppModale] = useState(false);

    useEffect(()=> {
      getDetenteurs();
    }, [])
    
    // ================= talk to server =========
    const ajoutDetenteur= async (e) => {
        e.preventDefault()
        setmsg('')
        if(post === ''){
          setmsg('Le champ doivent être remplis.')
          console.log(msg)
          return
         }
        const data = {
            post: post,
        }
      const res = await axios.post('http://localhost:5000/detenteurs' ,data,  {
          withCredentials: true
      })
      getDetenteurs();
      setDatajout(false)
      emptyData();
    }


    const getDetenteurs = async()=>{
      await axios.get('http://localhost:5000/detenteurs',{
         withCredentials: true
     })
     .then((res) => setDetenteurs(res.data))
     .catch((err) => console.log(err));
 }

    const modifDetenteur= async (e) => {
        console.log(post, id)
        e.preventDefault();
        const data = {
            post: post,
        }
        await axios.patch(`http://localhost:5000/detenteurs/${id}`,data, {
          withCredentials: true
       } );

      getDetenteurs();
      setModifModale(false)
      emptyData();
    }

    const deleteDetenteur = async ()=>{
        const res = await axios.delete(`http://localhost:5000/detenteurs/${id}`, {
         withCredentials: true
        });
        getDetenteurs();
    }

    const emptyData  = ()=>{
        setPost('');
    }

    const getDataModif =(d)=>{
        setModifModale(true);
        const { post , uuid}  = d;
      
      setid(uuid);
      setPost(post);
    }

    const  getId=(uid)=>{
      setid(uid)
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
                <Link className="add_new" onClick={()=>{setDatajout(true) ; setmsg(''); setPost('')}}>+ Ajouter</Link>
            </div>
        </div>

        <div className="table_section">
            <table>
                <thead>
                    <tr>
                        
                        <td id='td-right'>Détenteur</td>
                        <td id='td-left'>Action</td>
                    </tr>
                </thead>
                <tbody>
                    { detenteurs.map((d,i) => (<tr className='row' key={i}>
                        <td id='td-right'><strong> {i+1} </strong>{d.post}</td>
                        <td > 
                            <span className='tdbtns'>
                            <button onClick={() => {  setsuppModale(true); getId(d.uuid)}}> <FaTrash  className='icon'/> </button>
                            <a onClick={() => { setModifModale(true); getDataModif(d); }}><FaEdit  className='icon'/></a>
                            </span>
                        </td>
                    </tr>))}
                  
                </tbody>
            </table>
        </div>
    </div>


    {ajoutData &&   
    <div className='wrapperModale'> 
        <div className=" modal">
           <div className="headformDetenteur ">
             <h1 className='titleOne'>Nouveau Detenteur </h1>
             <FaRegWindowClose onClick={()=>setDatajout(false)} className='icon pointeur text-danger-hover' />
           </div>
           
         <div className="bodyformDetenteur ">
         
         {msg && (<p className='showMessage'>{msg}</p>)}
              <div className="row">
                 <div className="column">
                  <label htmlFor="detenteur">Detenteur</label>
                  <input value={post} onChange={(e)=>setPost(e.target.value)} type="text" name='detenteur' placeholder='Detenteur' />
                 </div>
              </div>
              <hr style={{margin:"4px"}} />
              <div className="flex1">




                <div className="column">
                    <button className="btn primary flex1" onClick={ajoutDetenteur }> <GrValidate className='icon' /> Valider</button >
                 </div>
                 <div className="column">
                    <button onClick={()=>{setDatajout(false) ; setmsg('')}} className=" danger btn text-white p-1 flex1"> <TiCancel className='icon' /> Annuler</button >
                 </div>
              </div> 
         </div>
        </div>
     </div>
    }
    {modifModale &&   
    <div className='wrapperModale'> 
        <div className=" modal">
           <div className="headformDetenteur ">
             <h1 className='titleOne'>Modification d'un Detenteur </h1>
             <FaRegWindowClose onClick={()=>setModifModale(false)} className='icon pointeur text-danger-hover' />
           </div>
      
         <div className="bodyformDetenteur ">
              <div className="row">
                 <div className="column">
                  <label htmlFor="detenteur">Detenteur</label>
                  <input value={post} onChange={(e)=>setPost(e.target.value)} type="text" name='detenteur' placeholder='Post' />
                 </div>
              </div>
              <hr style={{margin:"4px"}} />
              <div className="flex1">
                 <div className="colum">
                    <button  className="btn primary flex1" onClick={modifDetenteur} > <GrValidate className='icon' />Modifier</button >
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
        <div className=" modal">
           <div className="headformDetenteur ">
             <h1 className='titleOneSupp' >Suppression </h1>
             <FaRegWindowClose onClick={()=>setsuppModale(false)} className='icon pointeur text-danger-hover' />
           </div>
           <div className="bodyformDetenteur ">
              <div className="row">
                 <div className="column">
                  <p className='parasupp'>Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.</p>
                 </div>
              </div>
              <div className="flex1">
                 <div className="column">
                    <button  className="btn primary flex1" onClick={()=>{deleteDetenteur(); setsuppModale(false)}} > <GrValidate className='icon' />Oui</button >
                 </div>
                 <div className="column">
                    <button  onClick={()=> {setsuppModale(false); emptyData()}} className=" danger btn text-white p-1 flex1"> <TiCancel className='icon' /> Nom</button >
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
