import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';


function Body() {

    return (
        <>
            <div style={{display:'flex'}}>
                <div id="home" className="title" style={{overflow:'hidden'}}>
                    <h1>Hotel Sales Record</h1>
                    <h3>Keep secured the hotel profit</h3>
                    <div className="icon">
                        <a href=""><FontAwesomeIcon icon={faFacebook} /></a>
                        <a href=""><FontAwesomeIcon icon={faYoutube} /></a>
                        <a href=""><FontAwesomeIcon icon={faInstagram} /></a>
                    </div>

                </div>
                <div style={{ float: 'right' }} className="profile">
                    <img style={{height:'30em',marginTop:'5em',marginLeft:'8em'}} src="../img/profile.jpg" alt="" />
                </div>
            </div>
        </>
    );
}

export default Body;
