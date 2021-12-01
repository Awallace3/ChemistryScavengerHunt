import React, {useContext, useState, useEffect } from 'react';
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
    const [name, setName] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)
    const handleSubmitClicked = () => {
        setIsDisabled(true)
    }
    console.log("state status", state.api_status)
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsDisabled(false)
        }, 5000)
        return () => clearTimeout(timer)
    }, [isDisabled])
  if (isMobile) {
    return (
        <div className="background-container">    
         <div className="survey-container">
            <h1 style={{fontSize: "2rem", marginTop: "1%"}}> Survey </h1>
            <p > Please enter first and last name: </p>
            <input 
                    type="text" style={{width: "80vw", alignSelf: "center"}}
                    onChange={(answer) => {
                        u_name(answer.target.value)
                        setName(answer.target.value)
                    }
                    }
                    value={name}
                    
                    />
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
                <p> Do you have any suggestions for this scavenger hunt? </p>
                <input 
                    type="text" style={{width: "80vw", alignSelf: "center"}}
                    onChange={(answer) => {
                        u_improvements(answer.target.value)
                        setTextInput(answer.target.value)
                    }
                    }
                    value={textInput}
                    
                    />
                    {
                        state.api_status == 1 ? <p style={{color: 'green'}}>Successfully submitted results!</p> : null
                    }
             
                <Button 
              variant="primary" size="lg" style={{width: "50vw", alignSelf: "center", marginBottom: "2%", marginTop: "2%", backgroundColor: "#932432", borderColor: "#f3f3f3"}}
              onClick={() =>  {
                submit_survey(state)
                handleSubmitClicked()
              }}
              disabled={isDisabled}
                
            >Submit Survey</Button>
          </div>
          
        </div>
      )
    } else {
      return ( 

  <div className="background-container">    
         <div className="survey-container-full">
            <h1 style={{fontSize: "2rem", marginTop: "1%"}}> Survey </h1>
            <p > Please enter first and last name: </p>
            <input 
                    type="text" style={{width  : "60vw", alignSelf: "center"}}
                    onChange={(answer) => {
                        u_name(answer.target.value)
                        setName(answer.target.value)
                    }
                    }
                    value={name}
                    
                    />



            <p> Did you enjoy this scavenger hunt?</p>
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

                <p> Did you prefer this scavenger hunt over a traditional review?</p>
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

                <p> Do you have any suggestions for this scavenger hunt? </p>
                <input style={{width  : "60vw", alignSelf: "center"}}
                    type="textarea" 
                    onChange={(answer) => {
                        u_improvements(answer.target.value)
                        setTextInput(answer.target.value)
                    }
                    }
                    value={textInput}
                    
                    />
                <Button 
              variant="primary" size="lg" style={{width: "40vw", alignSelf: "center", marginBottom: "2%", marginTop: "2%", backgroundColor: "#932432", borderColor: "#f3f3f3"}} 
              onClick={() =>  {
                submit_survey(state)
              }}
                
            >Submit Survey</Button>
          </div>
          
        </div>

      )
    }
}
    

export default Survey;
