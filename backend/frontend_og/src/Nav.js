import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';


function Nav() {
    if (isMobile) {
        return (
          <div></div>
            )
    } else {

  return (
    <nav>
        <div className="Nav-container">
      
        <ul>
            <Link className="link-no-dec" to='/'>
                <li>HOME</li>
            </Link>
            <Link className="link-no-dec" to='/members'>
                <li>MEMBERS</li>
            </Link>
            <Link className="link-no-dec" to='/publications'>
                <li>PUBLICATIONS</li>
            </Link>
            <Link className="link-no-dec" to='/Resources'>
                <li>RESOURCES</li>
            </Link>
            <Link className="link-no-dec" to='/acknowledgements'>
                <li>ACKNOWLEDGEMENTS</li>
            </Link>
        </ul>

        </div>
    </nav>
  );
}
}

export default Nav;
