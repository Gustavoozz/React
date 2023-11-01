import React from 'react';
import './Nav.css'
import { Link } from 'react-router-dom';

import logoDesktop from "../../assets/icons/logo-pink.svg";
import logoMobile from '../../assets/images/logo-white.svg'

const Nav = () => {
    return (
        <nav className='navbar'>
            <span className="navbar__close">X</span>
            <Link to="/">
                <img 
                className='eventlogo__logo-image'
                src={window.innerWidth >= 992 ? logoDesktop : logoMobile}
                alt="Event Plus logo" />
            </Link>

            <div className='navbar__items-box'>
                <Link to="/">Home</Link>
                <Link to="/tipo-eventos">Tipo eventos</Link>
                <Link to="/eventos">Eventos</Link>
                <Link to="/login">Login</Link>
            </div>
        </nav>
    );
};

export default Nav;