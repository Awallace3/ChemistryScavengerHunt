import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { slide as Menu } from 'react-burger-menu';
import { Navbar, Container} from 'react-bootstrap'

import UMiss from './assets/acknowledgements/umiss.png'

function Nav() {
    return (
<>
  <Navbar className="color-nav">
  <Container>
    <Navbar.Brand href="#home">
      <img
        src={UMiss}
        height="30"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
      />
    </Navbar.Brand>
  </Container>
  </Navbar>
</>
    )
}

export default Nav;
