
import React, { useState, useEffect } from 'react';
import { MdOutlineAlternateEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiOutlineSwapRight } from "react-icons/ai";
import logoPack from '../../assets/logo-dark.png'

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../../security/authSlice";

import './login.css'


function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  // useEffect(() => {
  //   if (user.role==='admin' || user.role==='user' || isSuccess) {
  //     navigate("/dashboard");
  //   }
  //   if (user.role==='superviseur' || isSuccess) {
  //     navigate("/journalstock");
  //   }
  //   dispatch(reset());
  // }, [user, isSuccess, dispatch, navigate]);


  useEffect(() => {
    if (isSuccess) {
      // First, handle role-based navigation based on user role
      if (user.role === 'admin' || user.role === 'user') {
        navigate("/dashboard");
      } 
      else if (user.role === 'superviseur') {
        navigate("/journalstock");
      }
    }
  
    // Reset the state after the success has been handled
    dispatch(reset());
  
  }, [user, isSuccess, dispatch, navigate]);
  

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };


  return (
    <div className='loginPage flex'>
       
      <div className="container flex"> 
        <div className="formDiv flex">

          <div className="headerDiv">
            <img src={logoPack} alt="" />
            <h3>Connexion</h3>
          </div>
          { isError && <p className="showMessage">{message}</p>}
          <form action="" className='form grid' onSubmit={Auth}>
        <div className='inputDiv'>
          <label htmlFor="">Email</label>
          <div className='input flex'>
            <MdOutlineAlternateEmail className='icon' />
            <input type="email" id='email'
             value={email} onChange={(e)=>setEmail(e.target.value)}
             placeholder='Entrez email' />
          </div>
         
        </div>
        <div className='inputDiv'>
          <label htmlFor="">Password</label>
          <div className='input flex'>
            < RiLockPasswordFill  className='icon' />
            <input type="password" id='email' placeholder='***'  value={password} onChange={(e)=>setPassword(e.target.value)} />
          </div>
        </div>

        <button type='submit' className='btn flex'>
          <span>{isLoading ? "Loading..." : "Login"}</span>
          <AiOutlineSwapRight   className='icon'  />
        </button>

        <span className='forgotPassword'>
          Mot de passe oublié? <a href="">Cliquez ici</a>
        </span>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
