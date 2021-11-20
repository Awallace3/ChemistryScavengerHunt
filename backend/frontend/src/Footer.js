import React from 'react';
import './App.css';
import { isMobile } from 'react-device-detect';

const Footer = () => {
    

    if (isMobile) {
        return (
            <div className="Footer-container"> 
                <div className="Footer-contact-container">
                <a href="mailto:amwalla3@go.olemiss.edu">
                    <p>Issues?</p>
                    <p>Email: amwalla3@go.olemiss.edu</p>
                </a>
                </div>
            </div>
        )
    } else {
    return (
        <div className="Footer-container">
            <div className="Footer-contact-container">

                <a href="mailto:amwalla3@go.olemiss.edu">
                    <p>Issues?</p>
                    <p>Email: amwalla3@go.olemiss.edu</p>
                </a>

            </div>
        </div>
    )
}
}

export default Footer;
