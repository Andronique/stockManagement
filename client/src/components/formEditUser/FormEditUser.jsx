
import React, { useState , useEffect} from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import './formEditUser.css'
import { MdOutlineKeyboardBackspace } from "react-icons/md";
function FormEditUser() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const [msg, setmsg] = useState();
  const navigate = useNavigate();
  const { id } = useParams();




  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`,{
          withCredentials: true
      } );
        setName(response.data.name);
        setEmail(response.data.email);
        setRole(response.data.role);
        setPassword(response.data.password)
       
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.msg);
        }
      }
    };
    getUserById();
  }, [id]);

  const updateUser = async (e) =>{
    e.preventDefault();
    if(name===''|| email==='' ||  password ==='' || confPassword===''){
      setmsg('Tous les champs doivent être remplis.')
      return
     }
    try {
      await axios.patch(`http://localhost:5000/users/${id}`, {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
        role: role,
      }, {
        withCredentials: true
     } );
      navigate("/users");
    } catch (error) {
      if (error.response) {
       console.log(error)
      }
    }
  };
  return (
    <div>
        <div className="talbe_header">
           <Link to={'/users'}> <MdOutlineKeyboardBackspace className='back' />
           </Link>  <h1 className='titleOne'>Modification d'un utilisateur<h1 className='titleOne'> </h1></h1>
            <div>
                
            </div>
        </div>

    <form className="form-container" onSubmit={updateUser} >
    {msg && (<p className='showMessage'>{msg}</p>)}
      <div className="form-group">
        <label htmlFor="name">Nom</label>
        <input
          type="text"
          id="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email" required
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          placeholder="******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="confirm-password">Confirmer mot de passe</label>
        <input
          type="password"
          id="confirm-password"
          placeholder="******"
          value={confPassword}
          onChange={(e) => setConfPassword(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="role">Rôle</label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          
        >
          <option value="">rôle </option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="superviseur">Superuser</option>
        </select>
      </div>

      <button type="submit" className="btn-submit">
        Modifier
      </button>
    </form>


    </div>
  )
}

export default FormEditUser
