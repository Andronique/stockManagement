
import React, { useState , useEffect} from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import './formEditUser.css'
function FormEditUser() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();


  useEffect(() => {
    const getUserById = async () => {
      try {
        alert(role)
        const response = await axios.get(`http://localhost:5000/users/${id}`,{
          withCredentials: true
      } );
        setName(response.data.name);
        setEmail(response.data.email);
        setRole(response.data.role);
       
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getUserById();
  }, [id]);

  const updateUser = async (e) => {
    e.preventDefault();
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
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <div>
            <div className="talbe_header">
                <p className='titleOne'>Modification d'un utilisateur</p>
                <div>
              </div>
            </div>

    <form className="form-container" onSubmit={updateUser} >
      <div className="form-group">
        <label htmlFor="name">Name</label>
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
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          type="password"
          id="confirm-password"
          placeholder="******"
          value={confPassword}
          onChange={(e) => setConfPassword(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="role">Role</label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="Admin">Admin</option>
          <option value="User">User</option>
          <option value="Superuser">Superuser</option>
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
