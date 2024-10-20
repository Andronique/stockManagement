import React , {useState , useEffect} from 'react'
import axios from 'axios';
import { FaTrash } from "react-icons/fa6";
import { FaEdit, FaRegWindowClose } from "react-icons/fa";
import { Link } from 'react-router-dom';


function Users() {
    const [users, setUsers] = useState([]);

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

    const deleteUser = async (userId) => {
        const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.");
        if (confirmation) {
            try {
                await axios.delete(`http://localhost:5000/users/${userId}`, { 
                    withCredentials: true 
                });
                alert('L\'utilisateur a été supprimé avec succès.');
                getUsers();
            } catch (error) {
                console.error('Erreur lors de la suppression de l\'utilisateur :', error.response || error.message);
                alert('Une erreur est survenue lors de la suppression de l\'utilisateur.');
            }
        } else {
            alert('La suppression a été annulée.');
        }
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
                            <button onClick={() => deleteUser(user.uuid)}><FaTrash className='icon' /></button>
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
    </div>
  )
}

export default Users
