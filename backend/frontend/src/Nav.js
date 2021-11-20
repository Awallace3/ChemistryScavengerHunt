import React from 'react';
import './App.css';
import { Navbar, Container} from 'react-bootstrap'
import UMiss from './assets/acknowledgements/umiss.png'
import { useHistory } from "react-router-dom";

function Nav() {
  const history = useHistory();
  const linkPage = (link) => {
    history.push(link)
  }
    return (
<>
  <Navbar className="color-nav">
  <Container>
    <button style={{alignSelf: "center", backgroundColor: "white", borderColor: "white"}} onClick={() =>{
      linkPage('/')
    }}>
      Home
    </button>
    <button style={{alignSelf: "center", backgroundColor: "white", borderColor: "white"}} onClick={() =>{
      linkPage('/Event')
    }}>
      Event
    </button>
    <button style={{alignSelf: "center", backgroundColor: "white", borderColor: "white"}} onClick={() =>{
      linkPage('/Leaderboard')
    }}>
      Leaderboard
    </button>
      <img
        src={UMiss}
        height="30"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
      />
  </Container>
  </Navbar>
</>
    )
}

export default Nav;
