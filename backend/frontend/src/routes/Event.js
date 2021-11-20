import React, { useContext, useEffect } from 'react';
import '../styling/home.css'
import { isMobile } from 'react-device-detect';
import { Button } from 'react-bootstrap';
// import { useHistory } from "react-router-dom";
import {Context as EventContext } from '../context/EventContext';
import EventQuestion from '../components/EventQuestion';

function Event() {
    const { state, final_submit_results }  = useContext(EventContext)
    // const history = useHistory();

    useEffect(() => {
      if ( state.complete ) {
        // history.push('/Leaderboard')
        console.log('completed')
      }
    }, [state.complete])
    if (isMobile) {
      return (
        <div className="background-container"> 
          <div className="event-score-container">
            <p>Score: {state.gScore.curScore} / {state.gScore.totScore}</p>
          </div>

<EventQuestion/>

          {
            state.complete ? <>
            <Button variant="primary" size="lg" style={{width: "60vw", alignSelf: "center", backgroundColor: "#932432", borderColor: "#f3f3f3"}} onClick={() =>  final_submit_results(state) }>Submit Final Results!</Button>
          </>
          : null
        }
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
