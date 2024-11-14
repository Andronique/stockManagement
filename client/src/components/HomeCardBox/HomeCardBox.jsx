import React , {useState , useEffect} from 'react'
import { FaMoneyBill , FaCartFlatbed} from 'react-icons/fa6';
import { FaUsers } from "react-icons/fa6";
import {  AiFillWechat , AiFillEye } from 'react-icons/ai';
import { IoPricetags } from "react-icons/io5";
import { FaUserGroup } from "react-icons/fa6";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import axios from 'axios';
import './homeCardBox.css'

function HomeCardBox() {

    const [allUsers, setAllUsers] = useState(null);
    const [allDetenteurs, setAllDetenteurs] = useState(null);
    const [allArticles, setAllArticles] = useState(null);
    const [allMouvements, setAllMouvement] = useState(null);

    const getNbMouvement = async()=>{
        await axios.get('http://localhost:5000/getTotalMouvement',{
           withCredentials: true
       })
       .then((res) => {setAllMouvement(res.data) ; console.log(res.data)})
       .catch((err) => console.log(err))
    } 
    const getNbUser = async()=>{
        await axios.get('http://localhost:5000/getTotalUsers',{
           withCredentials: true
       })
       .then((res) => {setAllUsers(res.data) ; console.log(res.data)})
       .catch((err) => console.log(err))
    } 
    const getNbDetenteur = async()=>{
        await axios.get('http://localhost:5000/getTotalDetenteur',{
           withCredentials: true
       })
       .then((res) => {setAllDetenteurs(res.data) ; console.log(res.data)})
       .catch((err) => console.log(err))
    } 
    
    const getNbArticles = async()=>{
        await axios.get('http://localhost:5000/getTotalArticles',{
           withCredentials: true
       })
       .then((res) => {setAllArticles(res.data) ; console.log(res.data)})
       .catch((err) => console.log(err))
    } 

    useEffect(()=>{  
        getNbArticles();
        getNbDetenteur()
        getNbUser()
        getNbMouvement()
    }, [])

  return (
    <div className="carBox">
            <div className="card">
                <div>
                    <div className="numbers">00{allArticles}</div>
                    <div className="cardName">Nombre d'article</div>
                </div>

                <div className="conBx">
                    <IoPricetags />
                </div>
            </div>

            <div className="card">
                <div>
                    <div className="numbers">0{allUsers}</div>
                    <div className="cardName">Utilisateurs</div>
                </div>

                <div className="conBx">
                    <FaUserGroup />
                </div>
            </div>

            <div className="card">
                <div>
                    <div className="numbers"> 0{allDetenteurs} </div>
                    <div className="cardName">Détenteurs</div>
                </div>

                <div className="conBx">
                    <FaUsers  />
                </div>
            </div>

            <div className="card">
                <div>
                    <div className="numbers"> 00{allMouvements} </div>
                    <div className="cardName">Mouvements</div>
                </div>

                <div className="conBx">
                   <FaArrowRightArrowLeft />
                </div>
            </div>

        </div>
  )
}

export default HomeCardBox
