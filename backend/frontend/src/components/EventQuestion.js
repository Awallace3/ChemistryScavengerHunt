import React, {useContext} from 'react'
import '../styling/home.css'
import {Context as EventContext } from '../context/EventContext';
import { isMobile } from 'react-device-detect';
import { Button } from 'react-bootstrap';

const EventQuestion = () => {


    const { state, update_answer} = useContext(EventContext)
    const station = state.stations[state.position];
    console.log(station)
    if (isMobile) {
        return (
          <div className="eventQuestion-container"> 
       
           <div className="home-text">
               
              <p>Clue: {station.clue}</p>
              <p>Station: {station.station}</p>

              <div style={{flexDirection: 'row'}}>
                <p>Input:</p>
                <form>
                    <div className="radio">
                    <label>
                        <input
                        type="radio"
                        value="A"
                        checked={station.answer1 === "A"}
                        onChange={(answer) => update_answer(answer.target.value, 'answer1')}
                        />
                        A
                    </label>
                    </div>
                    <div className="radio">
                    <lablel>
                        <input
                        type="radio"
                        value="B"
                        checked={station.answer1 === "B"}
                        onChange={(answer) => update_answer(answer.target.value, 'answer1')}
                        />
                        B
                    </lablel>
                    </div>
                    <div className="radio">
                    <label>
                        <input
                        type="radio"
                        value="C"
                        checked={station.answer1 === "C"}
                        onChange={(answer) => update_answer(answer.target.value, 'answer1')}
                        />
                        C
                    </label>
                    </div>
                    <div className="radio">
                    <label>
                        <input
                        type="radio"
                        value="D"
                        checked={station.answer1 === "D"}
                        onChange={(answer) => update_answer(answer.target.value, 'answer1')}
                        />
                        D
                    </label>
                    </div>
                    <div className="radio">
                    <label>
                        <input
                        type="radio"
                        value="E"
                        checked={station.answer1 === "E"}
                        onChange={(answer) => update_answer(answer.target.value, 'answer1')}
                        />
                        E
                    </label>
                    </div>
                   
                    <div>
                   
                    </div>
                </form>
              </div>

              <div style={{flexDirection: 'row'}}>
                <p>Input:</p>
                <input type="text" onChange={(answer) => update_answer(answer.target.value, 'answer2')}/>
              </div>
            <Button variant="btn btn-success" onClick={() => console.log("submitted") }>Submit Answers!</Button>

            </div>      
          </div>
        )
      } else {
        return ( 
          <div className="evnetQuestion-container">
            <div className='home-text'>
              
            </div>  
          </div>
        )
      }

}
export default EventQuestion;