import React, {useState} from 'react'
import { MdOutlineAlternateEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiOutlineSwapRight } from "react-icons/ai";
import './login.css'


function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  return (
    <div className='loginPage'>
      <div className="container flex"> 
          <h3>Login</h3>
          <form action="">
        <span>login status will go here</span>
        <div className='inputDiv'>
          <label htmlFor="">Email</label>
          <div className='input flex'>
            <MdOutlineAlternateEmail className='inIcon' />
            <input type="email" id='email'
             value={email} onChange={(e)=>setEmail(e.target.value)}
             placeholder='Entrez email' />
          </div>
        </div>
        <div className='inputDiv'>
          <label htmlFor="">Password</label>
          <div className='input flex'>
            < RiLockPasswordFill  className='inIcon' />
            <input type="password" id='email' placeholder='***' />
          </div>
        </div>

        <button type='submit' className='btn flex'>
          <span>Login</span>
          <AiOutlineSwapRight   className='inIcon'  />
        </button>

        <span className='forgotPassword'>
          Mot de passe oublié? <a href="">Cliquez ici</a>
        </span>
          </form>
      </div>
    </div>
  )
}

export default Login
