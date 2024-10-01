"use server"
import React from "react";
import { NavLink } from "react-router-dom";

import {
  AiFillHome,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
import {
  FaBookJournalWhills,
  FaCircleChevronLeft,
} from "react-icons/fa6";
import { GiStockpiles } from "react-icons/gi";

import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { IoExitOutline } from "react-icons/io5";
import { CiInboxIn } from "react-icons/ci";
import "./sidebar.css";


function Sidebar({toggleMenu}) {

    const activeLink=()=> {
        const list = document.querySelectorAll(".navigation li");
    
        list.forEach((item) => {
          item.classList.remove("hovered");
        });
        
        this.classList.add("hovered");
    }

  return (
    <>
    <div className="navigation">
      <ul>
        <li>
          <NavLink to="/dfdfd">
            <span className="icon">
              <GiStockpiles className="ionIcon" />
            </span>
            <span className="title">Gestion de stock</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/dashboard">
            <span className="icon">
              <AiFillHome className="ionIcon" />
            </span>
            <span className="title">Tableau de bord</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/articles">
            <span className="icon">
              <CiInboxIn className="ionIcon" />
            </span>
            <span className="title">Entrée</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/exitArticle">
            <span className="icon">
              <IoExitOutline  className="ionIcon" />
            </span>
            <span className="title">Sortie</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/mouvement">
            <span className="icon">
              <FaArrowRightArrowLeft className="ionIcon" />
            </span>
            <span className="title">Mouvement</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/detenteur">
            <span className="icon">
              <AiOutlineUsergroupAdd className="ionIcon" />
            </span>
            <span className="title">Detenteur</span>
          </NavLink>
        </li>

      

        <li>
          <NavLink to="/journalstock">
            <span className="icon">
              <FaBookJournalWhills className="ionIcon" />
            </span>
            <span className="title">Journal de stock</span>
          </NavLink>
        </li>
        <span className="reduire" onClick={toggleMenu}>
          <span className="icon">
            <FaCircleChevronLeft className="ionIcon" />
          </span>
          <span className="title">Réduire</span>
        </span>
      </ul>
    </div>
  </>
  )
}

export default Sidebar







