import React, {useContext} from 'react';
import '../styling/home.css'
import { isMobile } from 'react-device-detect';
import { Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import {Context as EventContext } from '../context/EventContext';

const stations = [
  {
      "clue": "",
      "station": "S",
      "answer1": "",
      "answer2": "",
      "c_answer1": "",
      "c_answer2": "",
      "score": 0,
      "attempt": 0,
  },
  {
      "clue": "",
      "station": "P",
      "answer1": "",
      "answer2": "",
      "c_answer1": "",
      "c_answer2": "",
      "score": 0,
      "attempt": 0,
  },
  {
      "clue": "",
      "station": "D",
      "answer1": "",
      "answer2": "",
      "c_answer1": "",
      "c_answer2": "",
      "score": 0,
      "attempt": 0,
  },
  {
      "clue": "",
      "station": "F",
      "answer1": "",
      "answer2": "",
      "c_answer1": "",
      "c_answer2": "",
      "score": 0,
      "attempt": 0,
  },
  {
      "clue": "",
      "station": "G",
      "answer1": "",
      "answer2": "",
      "c_answer1": "",
      "c_answer2": "",
      "score": 0,
      "attempt": 0,
  },
  {
      "clue": "",
      "station": "H",
      "answer1": "",
      "answer2": "",
      "c_answer1": "",
      "c_answer2": "",
      "score": 0,
      "attempt": 0,
  },
  {
      "clue": "",
      "station": "I",
      "answer1": "",
      "answer2": "",
      "c_answer1": "",
      "c_answer2": "",
      "score": 0,
      "attempt": 0,
  },
  {
      "clue": "",
      "station": "J",
      "answer1": "",
      "answer2": "",
      "c_answer1": "",
      "c_answer2": "",
      "score": 0,
      "attempt": 0,
  },
  {
      "clue": "",
      "station": "K",
      "answer1": "",
      "answer2": "",
      "c_answer1": "",
      "c_answer2": "",
      "score": 0,
      "attempt": 0,
  },
  {
    "clue": "",
    "station": "L",
    "answer1": "",
    "answer2": "",
    "c_answer1": "",
    "c_answer2": "",
    "score": 0,
    "attempt": 0,
},
] 

// need pop up on begin() requesting name

function Home() {
  
  const { state, randomize_questions } = useContext(EventContext)
  
  function NewLineText(bio) {
      let splitLines = bio.split(`\n`)
      const finalLines = splitLines.map((number, ind) => <p key={ind}>{number}</p>)
      return finalLines
  }
  const history = useHistory();
  const handleRoute = () =>{ 
    history.push("/about");
  }
  const begin = () => {
    randomize_questions(stations)
    history.push('/Event')
  }

  const instructions = `After pressing begin, your quest begins.`
    if (isMobile) {
      return (
        <div className="background-container"> 
     
         <div className="home-text">
            <h1 style={{fontSize: "2rem", margin: "0"}}> SMACS 2021</h1>
            <h1 style={{fontSize: "2rem", margin: "0"}}> Scavenger Hunt</h1>
          </div>
          <form>
            <Button variant="btn btn-success" onClick={() => begin() }>Begin!</Button>
          </form>
          <div className="mobile-home-box">
            {NewLineText(instructions)}
          </div>

    
        </div>
      )
    } else {
      return ( 
        <div className="background-container">
         

          <div className='home-text'>
            <h1> SMACS 2021 </h1> <h1> Scavenger Hunt </h1>
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
