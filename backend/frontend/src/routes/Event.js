import React, { useContext, useEffect, useState } from 'react';
import '../styling/home.css'
import { isMobile } from 'react-device-detect';
import { Button } from 'react-bootstrap';
// import { useHistory } from "react-router-dom";
import {Context as EventContext } from '../context/EventContext';
import EventQuestion from '../components/EventQuestion';

function Event() {
    const { state, final_submit_results }  = useContext(EventContext)
    // const history = useHistory();
    const [disable, setDisable] = useState(false)
  console.log(state.api_status)
  console.log(state)
    useEffect(() => {
      if ( state.complete ) {
        // history.push('/Leaderboard')
        console.log('completed')
      }
      if (state.api_status == 2 && disable==true ) {
        console.log("triggered")
        setDisable(false)
      }
    }, [state.complete, state.api_status])

    if (isMobile) {
      return (
        <div className="background-container"> 
          <div className="event-score-container">
            <p>Score: {state.gScore.curScore} / {state.gScore.totScore}</p>
          </div>

          <EventQuestion/>

          {
            state.complete ? <>
            <Button 
              variant="primary" size="lg" style={{width: "60vw", alignSelf: "center", backgroundColor: "#932432", borderColor: "#f3f3f3"}} 
              onClick={() =>  {
                final_submit_results(state)
                //setDisable(true)
              }}
                disabled={disable}
            >Submit Final Results!</Button>
          </>
          : null
        }

        <div>
                <a href="mailto:amwalla3@go.olemiss.edu">
                    <p>Issues? Email: amwalla3@go.olemiss.edu</p>
                </a>

        </div>

        </div>
      )

    } else {
      return ( 
        <div className="background-container"> 
          <div className="event-score-container">
            <p>Score: {state.gScore.curScore} / {state.gScore.totScore}</p>
          </div>

          <EventQuestion/>

          {
            state.complete ? <>
            <Button 
              variant="primary" size="lg" 
              style={{width: "60vw", alignSelf: "center", backgroundColor: "#932432", borderColor: "#f3f3f3"}} 
              onClick={() =>  {
                final_submit_results(state)
                //setDisable(true)
              }}
              disabled={disable}
              >Submit Final Results!</Button>
          </>
          : null
        }

        <div>
                <a href="mailto:amwalla3@go.olemiss.edu">
                    <p>Issues? Email: amwalla3@go.olemiss.edu</p>
                </a>
        </div>


        </div>
      )
    }
}
    

export default Event;
