import React, { useEffect, useState } from 'react'
import './journalStock.css'
import axios from 'axios';
import { IoSearchSharp } from 'react-icons/io5';
import { FcViewDetails } from "react-icons/fc";
import { BiDetail } from "react-icons/bi";
import { Link } from 'react-router-dom';
function JournalStock() {

    const [fetched, setfetched] = useState();
    const  [allData, setallData] = useState([]);
   
    useEffect(()=>{
      getAllMouvement();
    }, [])
    const  getAllMouvement =()=>{
      axios
      .get('http://localhost:5000/getMouvementEntranceExit' , {
        withCredentials: true
      } )
      .then((res) => {setallData(res.data) ; console.log(res.data)} )
      .catch((err) => console.log(err));
    }
    
    const filterData = (search) => {
      let fechedData = allData.filter((item) => {
        // Only filter when search is not an empty string
        return item.design.toLowerCase().includes(search.toLowerCase());
      });
    
      // If search is empty, use the original alldata
      if (search === '') {
        fechedData = allData;
      }
    
      // Update state with filtered data
      setfetched(fechedData);
    };
  
    const journaldata = fetched ? fetched : allData ;
  return (
    <div className='journalStock'>

<div className="tableJournal">

        <div className="talbe_header">
            <h1 className='titleOne'>Journal des stocks</h1>
            <div>
              <input type="text" placeholder='recherche' className='searchInput'  onChange={(e)=>filterData(e.target.value)} />  
            </div>
        </div>
        <div className="table">
            <div className="table_section">
            <table>
            <thead>
                <th>Reference</th>
                <th>Designation</th>
                <th>Quantité entrée </th>
                <th>Quantité Sortie</th>
                <th>Quantité restant</th>
            </thead>
               
            <tbody>
             { journaldata.length === 0 ? ( 
               <tr>
               <td colSpan="5" className='nodataFound'>Aucune donnée trouvée</td> {/* Adjust colSpan according to your table's columns */}
             </tr>
             ) : (journaldata.map((d)=> (<tr>
                <td> {d.ref} </td>
                <td> {d.design} </td>
                <td className='td-detail'><span className='nb'>{d.total_entrance_quantity}</span> <Link to={`/journalstock/detailentrance/${d.uuid}`} className='detail'><BiDetail className='icon' /> <span>détails In</span></Link>   </td>
                <td className='td-detail'><span className='nb'>{d.total_exit_quantity}</span> <Link to={`/journalstock/detailexit/${d.uuid}`} className='detail'><BiDetail className='icon' /> <span>détails exit</span></Link>   </td>
                <td> {d.rest_quantity} </td>
             </tr>)) ) } 
                
            </tbody>
           </table>
            </div>
        </div>
        
       </div>

    </div>
  )
}
export default JournalStock
