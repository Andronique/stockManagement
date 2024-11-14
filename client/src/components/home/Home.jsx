import React, { useEffect } from 'react'
import './home.css'
import HomeCardBox from '../HomeCardBox/HomeCardBox'
import MyPieChart from '../circleChart/CircleChart'
import CustomBarChart from '../barChart/Try'
import ListedesArticles from './ListedesArticles'
import toast, { Toaster } from 'react-hot-toast';
function Home() {
 
  return (
    <div className='home'>
      <HomeCardBox />
      <div className="statistique">
          <div className="Piechart">
            <h1 className='titleOne center'>Consommation d'encre par PAC</h1>
            <MyPieChart />
          </div>
      
         <div>
         <h1 className='titleOne center'>Les trois articles les plus et les moins utilisés</h1>
            <div>
              <CustomBarChart/>
            </div>
         </div>
      </div>
      
      <ListedesArticles />
     
    </div>
  )
}

export default Home
