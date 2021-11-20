import React from 'react'
import '../styling/resource.css'

const BookTile = ({resource}) => {
    const resourceRequested = (req) => {
        switch (req) {
            case 'BOOK':
                return <a href={`https://www.amazon.com/Complete-Science-Communication-Connecting-Journalists-ebook/dp/B07KV26J1K`}>Find Online</a>
        }
    }
    return (
        <div className="book-tile-container">
            <h1>{resource.name}</h1>
            <div className="book-tile-container-description">
                <p>{resource.description}</p>
            </div>

            <div className="book-tile-download">
                <a href={resource.link}>View Online</a>
            </div>
        </div>
    )
}
export default BookTile;