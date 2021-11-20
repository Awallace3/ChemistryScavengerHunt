import React from 'react';
import '../styling/home.css'
import { isMobile } from 'react-device-detect';

function Home() {
  function NewLineText(bio) {
      let splitLines = bio.split(`\n`)
      const finalLines = splitLines.map((number, ind) => <p key={ind}>{number}</p>)
      return finalLines

      //return <p>test \nsj</p>
  }
  const researchSummary = `The Computational Astrochemistry Group (Fortenberry Lab) at Ole Miss leverages the use of computational techniques for the exploration of the structure and detectable spectra for novel molecular species in the interstellar medium (ISM), planetary atmospheres, and proto-planetary disks. Additionally, we work in utilizing the tenets of journalism, public relations, graphic design, and storytelling for the promotion of science both within the research community and with non-experts alike.
  
  Astrochemically, our group works to provide the chemical rationale and spectroscopic data for the detection of new molecules in space. The universe is a vast place, and the physical conditions of the myriad astrophysical environments are varied from those of the Earth. Hence, terrestrial chemistry is but a small subset of all possible chemical conditions where novel products can be generated with unknown properties.

  Additionally, the only way to detect such molecules is through remote sensing meaning that spectroscopic data for such molecules must be on hand in order to compare with observational data. However, experimental studies of molecular species in these environments can be exceptionally difficult. Computation does not suffer from these same constraints. Consequently, theoretical chemistry is uniquely suited to answer questions about the nature of molecules in space.`
    if (isMobile) {
      return (
        <div className="background-container"> 
          <div className="home-text">
            <h1 style={{fontSize: "2rem", margin: "0"}}> Computational Astrochemistry</h1>
            <h1 style={{fontSize: "2rem", margin: "0"}}> Group @ Ole Miss </h1>
          </div>

          <div className="mobile-home-box">
            {NewLineText(researchSummary)}
          </div>

    
        </div>
      )
    } else {
      return ( 
        <div className="background-container">
          <div className='home-text'>
            <h1> Computational Astrochemistry</h1> <h1>Group @ Ole Miss</h1>
          </div>

          <div className='home-columns'>
            <div className='home-columns-box'>
              {/*<p> {researchSummary} </p>*/}
              {NewLineText(researchSummary)}
            </div>
          </div>
        </div>
      )
    }
}
    

export default Home;
