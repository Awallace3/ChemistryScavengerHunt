import React, { useContext, useEffect } from 'react';
// import React from 'react';
import '../styling/home.css'
import { isMobile } from 'react-device-detect';
// import { Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import {Context as EventContext } from '../context/EventContext';
import EventQuestion from '../components/EventQuestion';

function Event() {
    const { state} = useContext(EventContext)
    const history = useHistory();

    useEffect(() => {
      if ( state.complete ) {
        history.push('/Leaderboard')
      }
    }, [state.complete])
    if (isMobile) {
      return (
        <div className="background-container"> 
          <div className="event-score-container">
            <p>Score: {state.gScore.curScore} / {state.gScore.totScore}</p>
          </div>

          <EventQuestion/>
        </div>
      )

    } else {
      return ( 
        <div className="background-container">
          <h1>If you navigate away from this page, you may lose progress.</h1>
          <EventQuestion/>
        </div>
      )
    }
}
    

export default Event;
