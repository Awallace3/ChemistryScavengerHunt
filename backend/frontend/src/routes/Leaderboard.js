import React, {useContext} from 'react';
import '../styling/home.css'
import { isMobile } from 'react-device-detect';
import { Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import {Context as EventContext } from '../context/EventContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Beaker from '../assets/beaker.png';

function Leaderboard() {

  const { state} = useContext(EventContext)

  const display_names = (names) => {
    
  }
  
  if (isMobile) {
    return (
        <div className="background-container">    
         <div className="home-text">
            <div className="home-text-border-box" >
              <img src={Beaker} alt="beaker" />
              <img src={Beaker} alt="beaker" />
              <img src={Beaker} alt="beaker" />
            </div>
            <h1 style={{fontSize: "2rem", margin: "0"}}> Final Results! </h1>

            <div style={{flexDirection: 'row'}}>
              <p>{state.names.name1}, {state.names.name2}, {state.names.name3}, {state.names.name4} </p>
              <p>Fianl Score: {state.gScore.curScore} / {state.gScore.totScore}</p>
            </div>

          </div>
        </div>
      )
    } else {
      return ( 
        <div className="background-container">
            <h1> SMACS 2021 </h1> 
            <h1> Scavenger Hunt </h1>
        </div>
      )
    }
}
    

export default Leaderboard;
