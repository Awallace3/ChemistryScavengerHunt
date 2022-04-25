import React, {useContext, useState} from 'react';
import '../styling/home.css'
import { isMobile } from 'react-device-detect';
import { Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import {Context as EventContext } from '../context/EventContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Beaker from '../assets/beaker.png';
import Names from '../components/Names';

function Home() {
  const { state, begin_event } = useContext(EventContext)
  function NewLineText(bio) {
      let splitLines = bio.split(`\n`)
      const finalLines = splitLines.map((number, ind) => <p key={ind}>{number}</p>)
      return finalLines
  }
  const [needName, setNeedName] = useState(false)
  const history = useHistory();
  const begin = () => {
    if ( state.names.name1 !== '' ){
      setNeedName(false)
      begin_event(state)
      history.push('/Event')
    } else {
      setNeedName(true)
    }
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
            <h1 style={{fontSize: "2rem", margin: "0"}}> SMACS Spring 2022</h1>
            <h1 style={{fontSize: "2rem", margin: "0"}}> Scavenger Hunt</h1>
          </div>

          <br />

        <div style={{margin: "3%"}}>
          <h2> Instructions: </h2>
          <p> Please do not enter any labs or locked rooms that may pose a safety hazard. The scavenger hunt takes place in the public areas.</p>
          <p> You will work in groups of up to four. Please enter your names below, press begin, and then you will be given clues to find locations that have sheets with questions on them.
            You will receive less points per failed attempt, but you may give up and continue after 3 attempts for no credit. </p>
        </div>

          {
            needName ? <p style={{color: 'red'}}>Please enter at least one name in the top left box to begin.</p> : null
          }
        <Names/>
          <>
            <Button variant="primary" size="lg" style={{width: "40vw", alignSelf: "center", backgroundColor: "#932432", borderColor: "#f3f3f3"}} onClick={() => begin() }>Begin!</Button>
          </>



        <div style={{margin: "3%"}}>
                <a href="mailto:amwalla3@go.olemiss.edu">
                    <p>Issues? Email: amwalla3@go.olemiss.edu</p>
                </a>

        </div>

        </div>
      )
    } else {
      return (
        <div className="background-container">

        <div className="home-text-full">
          <div className="home-text-border-box-full" >
            <img src={Beaker} alt="beaker" />
            <img src={Beaker} alt="beaker" />
            <img src={Beaker} alt="beaker" />
          </div>
          <h1 style={{fontSize: "3rem", margin: "0"}}> SMACS Spring 2022</h1>
          <h1 style={{fontSize: "3rem", margin: "0"}}> Scavenger Hunt</h1>
        </div>

          <br />

        <div className="instructions-container">
          <h2> Instructions: </h2>
          <p> Please do not enter any labs or locked rooms that may pose a safety hazard. The scavenger hunt takes place in the public areas.</p>
          <p> You will work in groups of up to four. Please enter your names below, press begin, and then you will be given clues to find locations that have sheets with questions on them.
            You will receive less points per failed attempt, but you may give up and continue after 3 attempts for no credit. </p>
        </div>

          {
            needName ? <p style={{color: 'red'}}>Please enter at least one name in the top left box to begin.</p> : null
          }
        <Names/>
          <>
            <Button variant="primary" size="lg" style={{width: "40vw", alignSelf: "center", backgroundColor: "#932432", borderColor: "#f3f3f3"}} onClick={() => begin() }>Begin!</Button>
          </>

        <div>
                <a href="mailto:amwalla3@go.olemiss.edu">
                    <p>Issues? Email: amwalla3@go.olemiss.edu</p>
                </a>
                </div>
        </div>

      )
    }
}


export default Home;
