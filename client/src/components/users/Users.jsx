import React , {useState , useEffect} from 'react'
import axios from 'axios';
import { FaTrash } from "react-icons/fa6";
import { FaEdit, FaRegWindowClose } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { GrValidate } from 'react-icons/gr';
import { TiCancel } from 'react-icons/ti';


function Users() {
    const [users, setUsers] = useState([]);
    const [suppModale, setsuppModale] = useState(false);
    const [id, setid] = useState(null);

    useEffect(()=>{
        getUsers();
    }, [])

    const getUsers = async()=>{
         await axios.get('http://localhost:5000/users',{
            withCredentials: true
        })
        .then((res) => setUsers(res.data))
        .catch((err) => console.log(err));
    }

    const  getId=(uid)=>{
        setid(uid)
      }

    const deleteUser = async () => {
    //   alert(id)
            try {
                await axios.delete(`http://localhost:5000/users/${id}`, { 
                    withCredentials: true 
                });
                // alert('L\'utilisateur a été supprimé avec succès.');
                getUsers();
            } catch (error) {
                console.error('Erreur lors de la suppression de l\'utilisateur :', error.response || error.message);
                alert('Une erreur est survenue lors de la suppression de l\'utilisateur.');
            }
    }
    const emptyData  = ()=>{
        setid('');
    }

  return (
    <div>
        <div className="table">
            <div className="talbe_header">
                <p className='titleOne'>Utilisateurs</p>
                <div>
                    <input type="text" placeholder="utilisateur" />
                    <Link to="/users/add" className="add_new">+ Nouveau utilisateur</Link>
                </div>
            </div>

        <div className="table_section">
            <table>
                <thead>
                    <tr>
                        <td>N°</td>
                        <td>Nom</td>
                        <td>Email</td>
                        <td>Rôle</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                   {users.map((user , index)=> (<tr>
                        <td>{index + 1}</td>
                        {/* <td> <img src="./image/camera.png" alt="Camera">  </td> */}
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td> <span className='tdbtns'>
                            <button onClick={() => {  setsuppModale(true); getId(user.uuid)}}><FaTrash className='icon' /></button>
                           <Link
                           to={`/users/edit/${user.uuid}`}>  <FaEdit  className='icon' /></Link>
                        </span>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </div>
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
                    <button  className="btn primary flex1" onClick={()=>{deleteUser(); setsuppModale(false)}} > <GrValidate className='icon' />Oui</button >
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

export default Users
