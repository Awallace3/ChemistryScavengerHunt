import React from 'react';
import '../App.css';
import Flippy, { FrontSide, BackSide } from 'react-flippy';

function CardFlip({ imageURI, title, authors, abstract, doi }) {
/*
    const parentRef = useRef(null)
    const childRef = useRef(null)

    useEffect( () => {
        if (parentRef.current){
            let parentWidth = parentRef.current.offsetHeight;
            let parentHeight = parentRef.current.offsetWidth;
            console.log(parentWidth, parentHeight)
        }
        if (childRef.current){
                let childWidth = parentRef.current.offsetHeight;
                let childHeight = parentRef.current.offsetWidth;
        }
    }, [parentRef, childRef]);
*/

    return (

        <div className="cardflip-container">
            <Flippy
                flipOnHover={false}
                flipOnClick={true}
                flipDirection="horizontal"
                className = "flippy-box"
                style={{ justifyContent: 'center'
                }} /// these are optional style, it is not necessary
                >
                <FrontSide
                    style={{
                        backgroundColor: 'grey',
                       
                    boxShadow: `7px 3px 10px grey`
                        }}
                    >
                <img
                    style={{height: '80%', width: '80%'}}
                    src={imageURI}
                    alt="new"
                />
                <div style={{alignSelf: 'flex-end', }}>
                    <h2 className="flippy-box-text">{title}</h2>
                </div>

                </FrontSide>
                <BackSide 
                style={{
                        backgroundColor: 'grey', 
                        boxShadow: `7px 3px 10px grey`,
                        }}>
                    <h3 className="flippy-box-text-backside">{title}</h3>
                    <h6 style={{margin: 0}}>{authors}</h6>
                    <div style={{textAlign: 'justify', borderColor: 'black', borderWidth: '3px', borderStyle: "style"}}>
                        <p className="flippy-box-text-backside-abstract"> {abstract} </p>
                    </div>
                    <a href={doi} style={{alignSelf: 'center'}}> Link </a>
                    <p></p>
                </BackSide> 
            </Flippy>
        </div>
    )
}

export default CardFlip;