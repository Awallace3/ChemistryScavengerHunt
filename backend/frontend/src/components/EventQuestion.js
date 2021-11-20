import React, {useContext, useState, useEffect} from 'react'
import '../styling/home.css'
import {Context as EventContext } from '../context/EventContext';
import { isMobile } from 'react-device-detect';
import { Button } from 'react-bootstrap';


const eval_to_user = (attempt, err) => {
    if(attempt > 0){
        if ( !err ) {
            return (
                <p style={{color: 'red'}}>Incorrect</p>
            )
        } else {
            return (
                <p style={{color: 'green'}}>Correct!</p>
            )
        }
    } else {
        return null
    }
}

const EventQuestion = () => {
    const [attempts, setAttempts] = useState(0)
    const [textInput, setTextInput] = useState('')
    const { 
        state, update_answer, 
        submit_answers, next_question,
        count_total_score
    } = useContext(EventContext)
    
    const station = state.stations[state.position];
    console.log("Station:", station)    
    function submission() {
        setAttempts(attempts+1)
        submit_answers(attempts)
        count_total_score()
    }
    // useEffect(() => {
    //     count_total_score()
    // }, [attempts])

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
                    
                        <input
                        type="radio"
                        value="A"
                        checked={station.answer1 === "A"}
                        onChange={(answer) => update_answer(answer.target.value, 'answer1')}
                        />
                        A
                    
                    </div>
                    <div className="radio">
                    
                        <input
                        type="radio"
                        value="B"
                        checked={station.answer1 === "B"}
                        onChange={(answer) => update_answer(answer.target.value, 'answer1')}
                        />
                        B
                    
                    </div>
                    <div className="radio">
                    
                        <input
                        type="radio"
                        value="C"
                        checked={station.answer1 === "C"}
                        onChange={(answer) => update_answer(answer.target.value, 'answer1')}
                        />
                        C
                    
                    </div>
                    <div className="radio">
                    
                        <input
                        type="radio"
                        value="D"
                        checked={station.answer1 === "D"}
                        onChange={(answer) => update_answer(answer.target.value, 'answer1')}
                        />
                        D
                    
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
                    {eval_to_user(attempts, state.correct1)}
                   
                    <div>
                   
                    </div>
                </form>
              </div>

              <div style={{flexDirection: 'row'}}>
                <p>Input:</p>
                <input 
                    type="text" 
                    onChange={(answer) => {
                        update_answer(answer.target.value, 'answer2')
                        setTextInput(answer.target.value)
                    }
                    }
                    value={textInput}
                    
                    />
                {eval_to_user(attempts, state.correct2)}
              </div>
            
            {attempts > 0 ? 
                <p>attempt: {attempts}</p> : null
            }
            
            <Button variant="btn btn-success" onClick={(e) => submission() }>Submit Answers!</Button>


            {
                state.correct1 && state.correct2 && attempts > 0 ? (
                    <Button variant="btn btn-success" onClick={() => {
                        next_question(attempts) 
                        setTextInput("")
                        setAttempts(0)
                    }
                }>Next Question!</Button>
                ) : (null)
            }

            {
                (!state.correct1 || !state.correct2) && attempts > 3 ? (
                    <Button variant="btn btn-success" onClick={() => {
                        next_question(attempts) 
                        setTextInput("")
                        setAttempts(0)
                    }
                }>Give up</Button>
                ) : (null)
            }


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