import React, {useContext} from 'react';
import '../styling/home.css'
import { isMobile } from 'react-device-detect';
import {Context as EventContext } from '../context/EventContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Beaker from '../assets/beaker.png';
import Trophy from '../assets/trophy.png'

function Leaderboard() {

  const { state} = useContext(EventContext)
  
  if (isMobile) {
    return (
        <div className="background-container">    
         <div className="home-text">
            <div className="home-text-border-box" >
              <img className="leaderboard-img" src={Trophy} alt="beaker" />
            </div>
            <h1 style={{fontSize: "2rem", margin: "0"}}> Final Results! </h1>

            <div className="leaderboard-container">
              <div>
                <p className="score-container">{state.names.name1} <br /> {state.names.name2} <br /> {state.names.name3} <br /> {state.names.name4} </p>
              </div>
              <p className="score-container">Final Score: <br /> {state.gScore.curScore} / {state.gScore.totScore}</p>
            </div>

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
              <div>
                <p className="score-container">{state.names.name1} <br /> {state.names.name2} <br /> {state.names.name3} <br /> {state.names.name4} </p>
              </div>
              <p className="score-container">Final Score: <br /> {state.gScore.curScore} / {state.gScore.totScore}</p>
            </div>

          </div>
        </div>

      )
    }
}
    

export default Leaderboard;
