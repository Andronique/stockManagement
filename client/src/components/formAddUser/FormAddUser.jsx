import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import './formAddUser.css'
import { MdOutlineKeyboardBackspace } from "react-icons/md";



function FormAddUser() {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const [msg, setmsg] = useState();
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    if(name===''|| email==='' ||  password ==='' || confPassword===''){
      setmsg('Tous les champs doivent être remplis.')
      return
     }
    try {
      await axios.post("http://localhost:5000/users", {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
        role: role,
      },   {
        withCredentials: true, // Set withCredentials to true
      });
      navigate("/users");
    } catch (error) {
      if (error.response){
        setmsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className="formAjout">
        <div className="talbe_header">
           <Link to={'/users'}> <MdOutlineKeyboardBackspace className='back' />
           </Link>  <h1 className='titleOne'>Ajout d'un utilisateur <h1 className='titleOne'> </h1></h1>
            <div>
                
            </div>
        </div>

    <form className="form-container" onSubmit={saveUser} >
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
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
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
        <label htmlFor="confirm-password">Confimer mot de passe</label>
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
          <option value="">rôle</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="superviseur">Superviseur</option>
        </select>
      </div>
      <button type="submit" className="btn-submit">
        Ajouter
      </button>
    </form>
    </div>
  )
}

export default FormAddUser
