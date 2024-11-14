import React, { useEffect, useState } from 'react'
import './journalStock.css'
import axios from 'axios';
import { IoSearchSharp } from 'react-icons/io5';
import { FcViewDetails } from "react-icons/fc";
import { BiDetail } from "react-icons/bi";
import { Link } from 'react-router-dom';
function JournalStock() {

    const [fetched, setfetched] = useState(null);
    const [allData, setallData] = useState([]);

    /*********** Pagination **************/
    const [currentPage, setcurrentPage] = useState(1);
    const recordsPerPage = 6;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;

    const records = fetched ? fetched.slice(firstIndex, lastIndex) : allData.slice(firstIndex, lastIndex);

    
    const npage = Math.ceil(allData.length / recordsPerPage);
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
             { records.length === 0 ? ( 
               <tr>
               <td colSpan="5" className='nodataFound'>Aucune donnée trouvée</td> {/* Adjust colSpan according to your table's columns */}
             </tr>
             ) : (records.map((d)=> (<tr>
                <td> {d.ref} </td>
                <td> {d.design} </td>
                <td className='td-detail flexdetail'><span className='nb'>{d.total_entrance_quantity}</span> <Link to={`/journalstock/detailentrance/${d.uuid}`} className='detail'><BiDetail className='icon' /> <span>détails</span></Link>   </td>
                <td className='td-detail'><span className='nb'>{d.total_exit_quantity}</span> <Link to={`/journalstock/detailexit/${d.uuid}`} className='detail'><BiDetail className='icon' /> <span>détails </span></Link>   </td>
                <td> {d.rest_quantity} </td>
             </tr>)) ) } 
                
            </tbody>
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

    </div>
  )
}
export default JournalStock
