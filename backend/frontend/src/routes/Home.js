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
  const { state } = useContext(EventContext)
  function NewLineText(bio) {
      let splitLines = bio.split(`\n`)
      const finalLines = splitLines.map((number, ind) => <p key={ind}>{number}</p>)
      return finalLines
  }
  const [needName, setNeedName] = useState(false)
  const history = useHistory();
  const begin = () => {
    if ( state.names.name1 !== '' ){
      history.push('/Event')
      setNeedName(false)
    } else {
      setNeedName(true)
    }
  }

  const instructions = `Press begin below to start the hunt!`
  if (isMobile) {
    return (
        <div className="background-container"> 
     
         <div className="home-text">
            <div className="home-text-border-box" >
              <img src={Beaker} alt="beaker" />
              <img src={Beaker} alt="beaker" />
              <img src={Beaker} alt="beaker" />
            </div>
            <h1 style={{fontSize: "2rem", margin: "0"}}> SMACS 2021</h1>
            <h1 style={{fontSize: "2rem", margin: "0"}}> Scavenger Hunt</h1>
          </div>

          <div className="home-columns">
            {NewLineText(instructions)}
          </div>
          {
            needName ? <p style={{color: 'red'}}>Please enter at least one name in the top left box to begin.</p> : null
          }
        <Names/>
          <>
            <Button variant="primary" size="lg" style={{width: "60vw", alignSelf: "center", backgroundColor: "#932432", borderColor: "#f3f3f3"}} onClick={() => begin() }>Begin!</Button>
          </>
        
        <div style={{margin: "3%"}}>
          <h2> Instructions: </h2>
          <p> Please do not enter any labs or locked rooms that may pose a safety hazard. The scavenger hunt takes place in the public areas.</p> 
          <p> You will work in groups of up to four. Please enter your names above, press begin, and then you will be given clues to find locations that have sheets with questions on them. 
            You will receive less points per failed attempt, but you may give up and continue after 3 attempts for no credit. </p>
        </div>

    
        </div>
      )
    } else {
      return ( 
        <div className="background-container">
         

          <div className='home-text'>
            <h1> SMACS 2021 </h1> 
            <h1> Scavenger Hunt </h1>
          </div>

          <form>
            <Button variant="btn btn-success" onClick={() => begin() }>Begin!</Button>
          </form>

          <div className='home-columns'>
            <div className='home-columns-box'>
              {NewLineText(instructions)}
            </div>
            
          </div>

          {/*<hr style={{ color: 'white', backgroundColor: 'white', height: 1, width: '80%' }} /> */}

        </div>
      )
    }
}
    

export default Home;
