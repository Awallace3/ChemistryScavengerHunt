import React from 'react';
import GitHubImg from './assets/GitHub-Mark.png';
import LinkedInImg from './assets/LinkedIn.jpeg';
import ResearchGateImg from './assets/ResearchGate.png';
import './App.css';
import { isMobile } from 'react-device-detect';

const Footer = () => {
    
    const copyRight = 't'
    const redirectURL = (url) => {
        return window.location.replace(url)
    }

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
