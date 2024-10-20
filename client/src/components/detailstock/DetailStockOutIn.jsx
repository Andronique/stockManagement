
import React , {useState , useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import './detail.css'
import axios from 'axios';
function DetailStockOutIn() {

  const { id } = useParams();
  const [mouvements, setMouvement] = useState([]);
   const [msg, setMsg] = useState('');

   useEffect(() => {
    const getMouvementInById = async () => {
      await axios.get(`http://localhost:5000/mouvementOutById/${id}`,{
          withCredentials: true
      }).then((res) => {setMouvement(res.data) ; console.log(res.data)})
      .catch((err) => console.log(err))
    };
    getMouvementInById();
  }, [id]);
  return (
    <div className='detailstock'>
        <div className="talbe_header">
      <Link to={'/journalstock'}> <MdOutlineKeyboardBackspace className='back' /></Link> 
      <h1 className='titleOne'>Détail de sortie d'un article <h1></h1></h1>
            <div>
                <input type="text" placeholder='recherche' />
            </div>

        </div>
      <div className="table">
        <div className="table_section">
        <table>
        <thead>
          <tr>
            <td>Design</td>
            <td>Detenteur</td>
            <td>Quantité</td>
            <td>Fait par</td>
            <td>Date</td>
          </tr>
        </thead>
        <tbody>
{mouvements.length === 0 ? (
          <tr>
            <td colSpan="5" className='nodataFound'>Aucune donnée trouvée</td> {/* Adjust colSpan according to your table's columns */}
          </tr>
             ) : (
               mouvements.map((d) => (
                 <tr
                   key={d.id}
                 >
                   <td>{d.design}</td>
                   <td>{d.detenteur.post}</td>
                   <td>{d.quantite}</td>
                   <td>{d.user.name}</td>
                   <td>{d.dateMouvement ? format(new Date(d.dateMouvement), 'dd/MM/yyyy') : 'N/A'}</td>
                 </tr>
               ))
             )}
</tbody> 
        </table>
      
        </div>
      </div>
   
    </div>
  )
}

export default DetailStockOutIn
