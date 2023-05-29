import React from 'react'
import Wrapper from "./Wrapper";
import {FaFacebook, FaGithub, FaLinkedin, FaTwitter} from 'react-icons/fa'
import {Link} from "react-router-dom";


function Footer() {


    return(
        <footer className='footer'>
            <div className='footer_center'>
                <div className='footer_icons'>
                    <ul className='flex' style={{justifyContent: "center"}}>
                        <li><FaFacebook /></li>
                        <li><FaTwitter /></li>
                        <li><Link to='https://www.linkedin.com/in/giorgio-morello-b72342231/' target='_blank'><FaLinkedin /></Link></li>
                        <li><Link to='https://github.com/GiorgioMorello' target='_blank'><FaGithub /></Link></li>
                    </ul>
                </div>
                <div className='footer_copy'>
                    <p>Cost<span> &copy; </span>Project 2023 </p>
                </div>
            </div>

        </footer>
    )
}


export default Footer