import React from 'react'
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <>
            <nav className="navbar">
                <div className="navLinks">
                    <NavLink to='/' className="navLink" end>Home</NavLink>
                    <NavLink to='/projects' className="navLink">Projects</NavLink>
                </div>
                <div className="profile">
                    <NavLink to="/about" className="navLink profileLink">About Me</NavLink>
                </div>
            </nav>
        </>
    );
}

export default Navbar;