import React from 'react';
import Wrapper from "./Wrapper";
import {Link} from "react-router-dom";
import logo from '../../../static/img/costs_logo.png'

function NavBar(){

    return(
        <nav className='nav'>
            <Wrapper flex_cls={true}>
                <Link to='/'><img alt='Logo costs' src={logo}/></Link>
                <ul className='links'>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/new-project'>Criar novo projeto</Link></li>
                    <li><Link to='/projects'>Projetos</Link></li>

                </ul>
            </Wrapper>
        </nav>
    )

}


export default NavBar