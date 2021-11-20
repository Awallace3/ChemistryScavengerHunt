import React from 'react';
import './App.css';
import { Navbar, Container} from 'react-bootstrap'
import UMiss from './assets/acknowledgements/umiss.png'
import { useHistory } from "react-router-dom";
import { Button } from 'react-bootstrap';

function Nav() {
  const history = useHistory();
  const linkPage = (link) => {
    history.push(link)
  }
    return (
<>
  <Navbar className="color-nav">
  <Container>
    <Button variant="secondary" size="sm" style={{alignSelf: "center", borderColor: "#f3f3f3", backgroundColor: "#3c1874"}} onClick={() =>{
      linkPage('/')
    }}>
      Home
    </Button>
    <Button variant="secondary" size="sm" style={{alignSelf: "center", borderColor: "#f3f3f3", backgroundColor: "#3c1874"}} onClick={() =>{
      linkPage('/Event')
    }}>
      Event
    </Button>
    <Button variant="secondary" size="sm" style={{alignSelf: "center", borderColor: "#f3f3f3", backgroundColor: "#3c1874"}} onClick={() =>{
      linkPage('/Leaderboard')
    }}>
      Leaderboard
    </Button>
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
