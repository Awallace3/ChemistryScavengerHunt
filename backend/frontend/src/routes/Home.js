import React, {useContext} from 'react';
import '../styling/home.css'
import { isMobile } from 'react-device-detect';
import { Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import {Context as EventContext } from '../context/EventContext';

const stations = [
  {
      "clue": "Clueeeee",
      "station": "S",
      "answer1": "",
      "answer2": "",
      "c_answer1": "A",
      "c_answer2": 11.1,
      "score": 0,
      "attempt": 0,
  },
  {
      "clue": "Clueeeee",
      "station": "P",
      "answer1": "",
      "answer2": "",
      "c_answer1": "A",
      "c_answer2": 11.1,
      "score": 0,
      "attempt": 0,
  },
  {
      "clue": "Clueeeee",
      "station": "D",
      "answer1": "",
      "answer2": "",
      "c_answer1": "A",
      "c_answer2": 11.1,
      "score": 0,
      "attempt": 0,
  },
  {
      "clue": "Clueeeee",
      "station": "F",
      "answer1": "",
      "answer2": "",
      "c_answer1": "A",
      "c_answer2": 11.1,
      "score": 0,
      "attempt": 0,
  },
  {
      "clue": "Clueeeee",
      "station": "G",
      "answer1": "",
      "answer2": "",
      "c_answer1": "A",
      "c_answer2": 11.1,
      "score": 0,
      "attempt": 0,
  },
  {
      "clue": "Clueeeee",
      "station": "H",
      "answer1": "",
      "answer2": "",
      "c_answer1": "A",
      "c_answer2": 11.1,
      "score": 0,
      "attempt": 0,
  },
  {
      "clue": "Clueeeee",
      "station": "I",
      "answer1": "",
      "answer2": "",
      "c_answer1": "A",
      "c_answer2": 11.1,
      "score": 0,
      "attempt": 0,
  },
  {
      "clue": "Clueeeee",
      "station": "J",
      "answer1": "",
      "answer2": "",
      "c_answer1": "A",
      "c_answer2": 11.1,
      "score": 0,
      "attempt": 0,
  },
  {
      "clue": "Clueeeee",
      "station": "K",
      "answer1": "",
      "answer2": "",
      "c_answer1": "A",
      "c_answer2": 11.1,
      "score": 0,
      "attempt": 0,
  },
  {
    "clue": "Clueeeee",
    "station": "L",
    "answer1": "",
    "answer2": "",
    "c_answer1": "A",
    "c_answer2": 11.1,
    "score": 0,
    "attempt": 0,
},
] 

// need pop up on begin() requesting name

function Home() {
  
  const { randomize_questions } = useContext(EventContext)
  
  function NewLineText(bio) {
      let splitLines = bio.split(`\n`)
      const finalLines = splitLines.map((number, ind) => <p key={ind}>{number}</p>)
      return finalLines
  }
  const history = useHistory();
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
