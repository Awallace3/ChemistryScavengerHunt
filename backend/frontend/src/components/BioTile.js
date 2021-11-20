import React from 'react'
import '../styling/biotiles.css'
import { isMobile } from 'react-device-detect'


// This function takes name and bio as props passed to it. The lorem is merely placeholder text to see how it looks. 
// See the example in the Members.js 

function NewLineText(bio) {
    let splitLines = bio.split(`\\n`)
    const finalLines = splitLines.map((number, ind) => <p2 key={ind}>{number}</p2>)
    return finalLines

    //return <p>test \nsj</p>
}

const Bio = ({person}) => {
    /*const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Nunc gravida elementum blandit. 
    Nulla elit ante, malesuada sit amet convallis eu, laoreet quis lectus. 
    Curabitur in urna elit. Donec leo erat, sollicitudin gravida mauris mattis, malesuada blandit nunc. 
    Ut gravida ut nunc non vulputate. 
    Pellentesque non orci odio. 
    Nullam imperdiet elit rhoncus justo fermentum, ac bibendum leo fermentum. 
    Vivamus at justo nec mauris pulvinar euismod sed eu lacus. 
    Duis vitae orci et enim vestibulum rhoncus ut a nulla.`
    */
    if (isMobile) {
    return (
        <div className='Tile-Container-Mobile'>

            <img src={require(`../assets/GroupPhotos/${person.image}`).default} alt="placeholder" />
            <div> 
                <p style={{ fontSize: '2em', marginBottom: '0', marginTop: '10px'}}>{person.name}</p>
                <div className="Tile-Element-Container-Mobile">
                    <p>Hometown: </p>
                    <p>{person.hometown}</p>
                </div>
                <div className="Tile-Element-Container-Mobile">
                    <p>Year Joined: </p>
                    <p>{person.year_joined}</p>
                </div>
                <div className="Tile-Element-Container-Mobile">
                    <p>Status: </p>
                    <p>{person.status}</p>
                </div>
                <div className="Tile-Element-Container-Bio">
                    <p>About Me: </p>
                    <p>{NewLineText(person.about_me)}</p>
                </div>
                
                
            </div>

        </div>
    );
} else {
    return (
        <div className='Tile-Container'>

            <img src={require(`../assets/GroupPhotos/${person.image}`).default} alt="placeholder" />
            <div> 
                <p style={{ fontSize: '2em', marginBottom: '0', marginTop: '10px'}}>{person.name}</p>
                <div className="Tile-Element-Container">
                    <p>Hometown: </p>
                    <p>{person.hometown}</p>
                </div>
                <div className="Tile-Element-Container">
                    <p>Year Joined: </p>
                    <p>{person.year_joined}</p>
                </div>
                <div className="Tile-Element-Container">
                    <p>Status: </p>
                    <p>{person.status}</p>
                </div>
                <div className="Tile-Element-Container-Bio">
                    <p>About Me: </p>
                    <p>{NewLineText(person.about_me)}</p>
                </div>
                
                
            </div>

        </div>
    )
    }
}

export default Bio;