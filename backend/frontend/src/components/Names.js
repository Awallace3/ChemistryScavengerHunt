import React, {useContext, useState, } from 'react'
import '../styling/home.css'
import {Context as EventContext } from '../context/EventContext';
import { isMobile } from 'react-device-detect';

const Names = () => {

    const { 
        state, update_names
    } = useContext(EventContext)
    const [names, setNames] = useState(state.names);
        const handleChange = (val, name_num) => {
            setNames(prevState => ({
                ...prevState,
                [name_num]: val
            }));
        };

    if (isMobile) {
        return (
        
      <div style={{display: 'flex', flexDirection: 'column', width: '80%', alignSelf: 'center', marginBottom: "4%"}}>
          Enter names for up to 4 group members
              <input
                    value={names.name1}
                    type="text"
                    onChange={(e) => {
                        update_names(e.target.value, "name1")
                        handleChange(e.target.value, "name1")
                    }}
                    name="name1"
                />
                <input
                    value={names.name2}
                    type="text"
                    onChange={(e) => {
                        update_names(e.target.value, "name2")
                        handleChange(e.target.value, "name2")
                    }}
                    name="name2"
                />
                <input
                    value={names.name3}
                    type="text"
                    onChange={(e) => {
                        update_names(e.target.value, "name3")
                        handleChange(e.target.value, "name3")
                    }}
                    name="name3"
                />
                <input
                    value={names.name4}
                    type="text"
                    onChange={(e) => {
                        update_names(e.target.value, "name4")
                        handleChange(e.target.value, "name4")
                    }}
                    name="name4"
                />
          
        </div>
        )
      } else {
        return (
        <div style={{display: 'flex', flexDirection: 'column', width: '60%', alignSelf: 'center', marginBottom: "4%"}}>
          Enter names for up to 4 group members
              <input
                    value={names.name1}
                    type="text"
                    onChange={(e) => {
                        update_names(e.target.value, "name1")
                        handleChange(e.target.value, "name1")
                    }}
                    name="name1"
                />
                <input
                    value={names.name2}
                    type="text"
                    onChange={(e) => {
                        update_names(e.target.value, "name2")
                        handleChange(e.target.value, "name2")
                    }}
                    name="name2"
                />
                <input
                    value={names.name3}
                    type="text"
                    onChange={(e) => {
                        update_names(e.target.value, "name3")
                        handleChange(e.target.value, "name3")
                    }}
                    name="name3"
                />
                <input
                    value={names.name4}
                    type="text"
                    onChange={(e) => {
                        update_names(e.target.value, "name4")
                        handleChange(e.target.value, "name4")
                    }}
                    name="name4"
                />
          
        </div>
        )
      }

}
export default Names;