import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import './formModifArticle.css'
import { GrValidate } from "react-icons/gr";
import { TiCancel } from "react-icons/ti";

import { MdOutlineKeyboardBackspace } from "react-icons/md";

function FormModifArticle() {

  const [design , setDesign] = useState('');
  const [fournisseur ,  setFournisseur] = useState()
  const [typeArticle, settypeArticle] = useState(null)
  const [piece, setPiece] = useState(null)
  const [obs , setObs] = useState(null)
  const [quantite , setQantinte] = useState(null)
  const [numArticle , setNumArticle] = useState()
  const [alldata , setData] = useState([]);
  const [date, setDate] = useState("");
  const [referenceNumber, setReferenceNumber] = useState('');
  const [uuid, setuuid] = useState('');

  const navigate = useNavigate();
  const {id} = useParams()


  const saveArticle = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/article/${id}`, {
        numArticle: numArticle,
        design: design,
        obs: obs,
        fournisseur: fournisseur,
        typeArticle: typeArticle,
        piece:piece,
        quantite:quantite,
        date:date
      }, {
        withCredentials: true, // Set withCredentials to true
      });
      navigate("/entree-article");
    } catch (error) {
      if (error.response){
        setMsg(error.response.data.msg);
      }
    }
  };

  useEffect(() => {
  const getArticle = async()=>{
    await axios.get(`http://localhost:5000/article/${id}`,{
       withCredentials: true
   })
   .then((res) => {
    setDesign(res.data.design);
    setNumArticle(res.data.ref)
    setuuid(res.data.uuid)
    setFournisseur(res.data.fournisseur)
    setQantinte(res.data.quantite)
    settypeArticle(res.data.typeArticle)
    setDate(formatDate(res.data.dateAquisition))
    setObs(res.data.obs)
    setPiece(res.data.piece)
    console.log(res.data.piece)
})
   .catch((err) => console.log(err))
}
getArticle();
fillData();
}, [])

const fillData=()=>{
    console.log(alldata)
    const {design, uuid, fournisseur, quantite, ref ,date,obs} = alldata;
}

const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  console.log(formatDate(date))
return (
    <div>
      <div className="talbe_header">
          <Link to={'/entree-article'}> <MdOutlineKeyboardBackspace className='back' /> </Link>
          <p className='titleOne'>Modification d'un article</p> <h1></h1>
      </div>

    <form className="form-container" onSubmit={saveArticle} >

    <div className="column">
       <div className="form-group">
        <label htmlFor="name">Num Article</label>
        <input type="text" id="refInput" value={numArticle} readOnly />
      </div>
      <div className="form-group">
        <label htmlFor="name">Designation</label>
        <input
          type="text"
          id="name"
          placeholder="Nom d'article"
          value={design}
          onChange={(e) => setDesign(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="name">Date</label>
         <input 
          type="date" 
          value={date} 
          onChange={(e)=>setDate(e.target.value)}
         />
      </div>

      <div className="form-group">
        <label htmlFor="password">Quantité</label>
        <input
          type="number"
          placeholder="000"
          value={quantite}
          onChange={(e) => setQantinte(e.target.value)}
        />
      </div>
    </div>



      <div className="column">
       <div className="form-group">
        <label htmlFor="password">Fournisseur</label>
        <input
          type="text"
          placeholder="Fournisseur"
          value={fournisseur}
          onChange={(e) => setFournisseur(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label >Observation</label>
        <input
          type="text"
          placeholder="Obs"
          value={obs}
          onChange={(e) => setObs(e.target.value)}
        />
      </div>


      <div className="form-group">
        <label >Type d'article</label>
        <select
          value={typeArticle}
          onChange={(e) => settypeArticle(e.target.value)}
        >
          <option value="Fourniture consommable">Fourniture consommable</option>
          <option value="Produit d'entretien">Produit d'entretien</option>
       </select>
      </div>
      <div className="form-group">
        <label htmlFor="role">Pièce</label>
        <select
          value={piece}
          onChange={(e) => setPiece(e.target.value)}
        >
          <option value="Pièce">Pièce</option>
          <option value="Boite">Boite</option>
       </select>
      </div>
        </div>
        <div className="flex1">
                 <div className="colum">
                    <button className=" primary btn flex1" > <GrValidate className='icon' /> <span> Valider</span> </button >

                 </div>
                 <div></div>
                 <div className="colum">
                    <Link to={"/entree-article"}
                     className=" danger text-white p-1 btn flex1"> <TiCancel className='icon' /> <span>Annuler</span> </Link >
                 </div>
        </div>
      </form>
    </div>
  )
}

export default FormModifArticle



