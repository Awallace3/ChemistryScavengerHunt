import React, {useContext, useEffect} from 'react';
import '../styling/home.css'
import { isMobile } from 'react-device-detect';
import {Context as EventContext } from '../context/EventContext';

function Survey() {

  const { state } = useContext(EventContext)
  
  if (isMobile) {
    return (
        <div className="background-container">    
         <div className="home-text">
            <div className="home-text-border-box" >
              <img className="leaderboard-img" src={Trophy} alt="beaker" />
            </div>
            <h1 style={{fontSize: "2rem", margin: "0"}}> Final Results! </h1>

            <div className="leaderboard-container">
            </div>
            <h1 style={{fontSize: "2rem", margin: "0"}}> Leaderboard </h1>
          </div>
        </div>
      )
    } else {
      return ( 
       <div className="background-container">    
         <div className="home-text-full">
            <div className="home-text-border-box-full" >
              <img className="leaderboard-img-large" src={Trophy} alt="beaker" />
            </div>
            <h1 style={{fontSize: "2rem", margin: "0"}}> Final Results! </h1>

            <div className="leaderboard-container-full">
            </div>
            <h1 style={{fontSize: "2rem", margin: "0"}}> Leaderboard </h1>

          </div>
        </div>

      )
    }
}
    

export default Survey;
