import React from 'react'
import "./Nav.css"
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';
import logo from '../../assets/logo.png'
import Friends from '../Friends/Friends';

export default function Nav() { 
    const { user } = useAuthContext();
    const { logout } = useLogout();
  return (
    <>
    <nav className="navbar">
      <div className="navbar-left">
        <a href='/'><img className='nav-logo' src={logo} alt="Logo" /></a>
      </div>
      <div className="navbar-right">
        
        {user ?
        <>
        <span className="navbar-username">{user.displayName}</span>
        <a href={`/profile/${user.uid}`}>
        <img src={user.photoURL} alt="Profile" className="navbar-profile" />
        </a>
        <button className='btn'style={{"marginRight": "10px"}}>Friends</button>
        <button className="btn" onClick={logout}>Log Out</button>
        </>
        : null}
      </div>
    </nav>
    {user &&
    <div className='nav-friends'>
      <Friends />
    </div>
    }
    </>
  )
}
