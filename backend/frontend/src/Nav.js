import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { slide as Menu } from 'react-burger-menu';


function Nav() {
    if (isMobile) {
        return (
            <Menu>
                <a id="home" className="menu-item" href="/"> Home </a>
            </Menu>
            )
    } else {

  return (
    <nav>
        <div className="Nav-container">
        {/*<img src={GroupLogo} alt='grouplogo' width='50' height='60' />*/}
        <ul>
            <Link className="link-no-dec" to='/'>
                <li>HOME</li>
            </Link>
            {
                /*
                <Link className="link-no-dec" to='/Event'>
                   <li>EVENT</li>
               </Link>
                */
            }
        </ul>

        </div>
    </nav>
  );
}
}

export default Nav;
