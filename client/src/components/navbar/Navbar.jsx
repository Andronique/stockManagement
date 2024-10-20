import React from 'react'
import {BsFillBellFill ,BsFillEnvelopeFill, BsPersonCircle, BsSearch , BsJustify, BsMenuButton} from 'react-icons/bs'
import {CgMenuBoxed} from 'react-icons/cg'
import { IoMenuSharp } from "react-icons/io5";
import "./navbar.css"
import { IoMdNotificationsOutline } from "react-icons/io";
import { TbLogout } from "react-icons/tb";

import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from '../../security/authSlice';

function Navbar() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div className="">
     <div className='header-container'>
     <div className="header-left">
         <button className='sidebar-toggler poineur'>
             <IoMenuSharp className="icon " />
         </button>
         
        <h3 className="header-title">Dashboard</h3>
      </div>
      <div className="header-btns">
         <button>
             <IoMdNotificationsOutline className="icon" />
         </button>
         <button className='notification-btn header-btn' onClick={logout}>
             <TbLogout className="icon" />
         </button>

      </div>
     </div> 
</div>
  )
}

export default Navbar




