import React , {useEffect, useState} from 'react'
import axios from 'axios'
import { format } from 'date-fns'
import { IoSearchSharp } from 'react-icons/io5'
import './listedesArticles.css'
function ListedesArticles() {
    const [idlist, setIdlist]= useState(null)
    const [feched, setfeched] = useState(null);
    
    const [data , setData] = useState([])

        /*********** Pagination **************/
        const [currentPage, setcurrentPage] = useState(1);
        const recordsPerPage = 6;
        const lastIndex = currentPage * recordsPerPage;
        const firstIndex = lastIndex - recordsPerPage;
    
        const records = feched ? feched.slice(firstIndex, lastIndex) : data.slice(firstIndex, lastIndex);


        const npage = Math.ceil(data.length / recordsPerPage);
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
              fechedData = data;
            } else {
              // Filter based on multiple fields
              fechedData = data.filter((item) => {
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
          

        const filterData = (search) => {
            let fechedData = data.filter((item) => {
              // Only filter when search is not an empty string
              return item.design.toLowerCase().includes(search.toLowerCase());
            });
          
            // If search is empty, use the original alldata
            if (search === '') {
              fechedData = data;
            }
          
            // Update state with filtered data
            setfeched(fechedData);
          };
         

    const getArticles = async()=>{
        await axios.get('http://localhost:5000/articles',{
           withCredentials: true
       })
       .then((res) => {
        setData(res.data) ; console.log(res.data)
    })
       .catch((err) => console.log(err))
    }

    useEffect(()=> {
         getArticles();
    }, [])
  return (
    <div className='ListesArticles'>
   <div className='wrapperHeadTable'>
       <div className="button">
           <h1 className='titleOne'>Listes des articles</h1>
       </div>
       <div className='headTable'>
           <input type="text"  onChange={(e)=>filterDatab(e.target.value)}  className='searchInput' />
           <IoSearchSharp  className='icon' />
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
                        setIdlist(d.id);
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
  )
}

export default ListedesArticles
