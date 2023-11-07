import React from 'react';
import './Nav.css'
import { Link } from 'react-router-dom';

import logoDesktop from "../../assets/images/logo-pink.svg";
import logoMobile from "../../assets/images/logo-white.svg";


const Nav = ( { setExibeNavbar, exibeNavbar } ) => {
    return (
        <nav className={`navbar ${ exibeNavbar ? "exibeNavbar" : "" }`}>
            <span className="navbar__close" onClick={() => setExibeNavbar(false)}>
                X
            </span>

            <Link to="/">
                <img 
                className='eventlogo__logo-image'
                src={window.innerWidth >= 992 ? logoDesktop : logoMobile}
                alt="Event Plus logo" />
            </Link>

            <div className='navbar__items-box'>
                <Link to="/" className='navbar__item'>Home</Link>
                <Link to="/tipo-eventos" className='navbar__item'>Tipo eventos</Link>
                <Link to="/eventos" className='navbar__item'>Eventos</Link>
                <Link to="/login" className='navbar__item'>Login</Link>
            </div>
        </nav>
    );
};

export default Nav;