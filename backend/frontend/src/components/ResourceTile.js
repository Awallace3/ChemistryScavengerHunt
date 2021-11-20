import React from 'react'
import '../styling/resource.css'
import spectroPDF from '../assets/resource_docs/spectro_manual.pdf';
import intderPDF from '../assets/resource_docs/INTDER05_Manual.pdf'

const ResourceTile = ({resource}) => {
    const resourceRequested = (req) => {
        switch (req) {
            case 'Spectro':
                return <a href={spectroPDF}>Download</a>
            case 'INTDER05':
                return <a href={intderPDF}>Download</a>
        }
    }
    return (
        <div className="resource-tile-container">
            <h1>{resource.name}</h1>
            <div className="resource-tile-container-description">
                <p>{resource.description}</p>
            </div>

            <div className="resource-tile-download">
                {resourceRequested(resource.name)}
            </div>
        </div>
    )
}
export default ResourceTile;