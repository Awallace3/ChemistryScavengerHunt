import React, {useContext, useState } from 'react';
import '../styling/home.css'
import { isMobile } from 'react-device-detect';
import {Context as SurveyContext } from '../context/SurveyContext'
import { Button } from 'react-bootstrap';

function Survey() {

  
    const { state, 
        u_name, u_q, 
        u_improvements,
        submit_survey
    } = useContext(SurveyContext)
    const [textInput, setTextInput] = useState('')
  console.log(state)
  
  const mc = (func, q) => {
    return (
      <form className={"radio-form"}>
        <label> 
            <input
            type="radio"
            value={1}
            checked={state.qs[q] === 1}
            onChange={(answer) => func(answer.target.value, q)}
            />
            1
        </label>

        <label> 
            <input
            type="radio"
            value={2}
            checked={state.qs[q] === 2}
            onChange={(answer) => func(answer.target.value, q)}
            />
            2
        
        </label> 
        
        <label> 
            <input
            type="radio"
            value={3}
            checked={state.qs[q] === 3}
            onChange={(answer) => func(answer.target.value, q)}
            />
            3
        </label> 
        
        <label> 
            <input
            type="radio"
            value={4}
            checked={state.qs[q] === 4}
            onChange={(answer) => func(answer.target.value, q)}
            />
            4
        </label> 
        
        <label> 
            <input
            type="radio"
            value={5}
            checked={state.qs[q] === 5}
            onChange={(answer) => func(answer.target.value, q)}
            />
            5
        </label> 

        <div>
        
        </div>
    </form> 
    )
  }
  
  if (isMobile) {
    return (
        <div className="background-container">    
         <div className="home-text">
            <h1 style={{fontSize: "2rem", margin: "0"}}> Survey </h1>
            <p > Did you enjoy this scavenger hunt?</p>
               <form className={"radio-form"}>
                   
                    <input
                    type="radio"
                    value={1}
                    checked={state.qs.q1 === 1}
                    onChange={(answer) => u_q(answer.target.value, 'q1')}
                    />
                    1
                
                    <input
                    type="radio"
                    value={2}
                    checked={state.qs.q1 === 2}
                    onChange={(answer) => u_q(answer.target.value, 'q1')}
                    />
                    2
                
                
                    <input
                    type="radio"
                    value={3}
                    checked={state.qs.q1 === 3}
                    onChange={(answer) => u_q(answer.target.value, 'q1')}
                    />
                    3
                
                    <input
                    type="radio"
                    value={4}
                    checked={state.qs.q1 === 4}
                    onChange={(answer) => u_q(answer.target.value, 'q1')}
                    />
                    4
                
                    <input
                    type="radio"
                    value={5}
                    checked={state.qs.q1 === 5}
                    onChange={(answer) => u_q(answer.target.value, 'q1')}
                    />
                    5
                

                    <div>
                   
                    </div>
                </form>

                <p > Did you prefer this scavenger hunt over a traditional review?</p>
               <form className={"radio-form"}>
                    
                        <input
                        type="radio"
                        value={1}
                        checked={state.qs.q2 === 1}
                        onChange={(answer) => u_q(answer.target.value, 'q2')}
                        />
                        1
                  
                        <input
                        type="radio"
                        value={2}
                        checked={state.qs.q2 === 2}
                        onChange={(answer) => u_q(answer.target.value, 'q2')}
                        />
                        2
                    
                  
                        <input
                        type="radio"
                        value={3}
                        checked={state.qs.q2 === 3}
                        onChange={(answer) => u_q(answer.target.value, 'q2')}
                        />
                        3
                   
                        <input
                        type="radio"
                        value={4}
                        checked={state.qs.q2 === 4}
                        onChange={(answer) => u_q(answer.target.value, 'q2')}
                        />
                        4
                   
                        <input
                        type="radio"
                        value={5}
                        checked={state.qs.q2 === 5}
                        onChange={(answer) => u_q(answer.target.value, 'q2')}
                        />
                        5
                    

                    <div>
                   
                    </div>
                </form>
                <p > How difficult were the questions?</p>
               <form className={"radio-form"}>

                    
                        <input
                        type="radio"
                        value={1}
                        checked={state.qs.q3 === 1}
                        onChange={(answer) => u_q(answer.target.value, 'q3')}
                        />
                        1
                    

                  
                        <input
                        type="radio"
                        value={2}
                        checked={state.qs.q3 === 2}
                        onChange={(answer) => u_q(answer.target.value, 'q3')}
                        />
                        2
                    
                   
                        <input
                        type="radio"
                        value={3}
                        checked={state.qs.q3 === 3}
                        onChange={(answer) => u_q(answer.target.value, 'q3')}
                        />
                        3
                   
                        <input
                        type="radio"
                        value={4}
                        checked={state.qs.q3 === 4}
                        onChange={(answer) => u_q(answer.target.value, 'q3')}
                        />
                        4
                   
                        <input
                        type="radio"
                        value={5}
                        checked={state.qs.q3 === 5}
                        onChange={(answer) => u_q(answer.target.value, 'q3')}
                        />
                        5
                    <div>
                    </div>
                </form>
                <input 
                    type="text" 
                    onChange={(answer) => {
                        u_improvements(answer.target.value)
                        setTextInput(answer.target.value)
                    }
                    }
                    value={textInput}
                    
                    />
                <Button 
              variant="primary" size="lg" style={{width: "60vw", alignSelf: "center", backgroundColor: "#932432", borderColor: "#f3f3f3"}} 
              onClick={() =>  {
                submit_survey(state)
              }}
                
            >Submit Survey</Button>
          </div>
          
        </div>
      )
    } else {
      return ( 
       <div className="background-container">    
         <div className="home-text-full">
            <h1 style={{fontSize: "2rem", margin: "0"}}> Results! </h1>

            <div className="leaderboard-container-full">
            </div>
            <h1 style={{fontSize: "2rem", margin: "0"}}> Leaderboard </h1>

          </div>
        </div>

      )
    }
}
    

export default Survey;
