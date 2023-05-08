import React from 'react'
import { useState } from 'react';
import "./Nav.css"
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';
import logo from '../../assets/logo.png'
import Friends from '../Friends/Friends';
import { Link } from 'react-router-dom';

export default function Nav() { 
    const { user } = useAuthContext();
    const { logout } = useLogout();
    const [firendsTab, setFriendsTab] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        if (firendsTab) {
            setFriendsTab(false);
        }
        else {
            setFriendsTab(true);
        }
    }

  return (
    <>
    <nav className="navbar">
      <div className="navbar-left">
        <a href='/'><img className='nav-logo' src={logo} alt="Logo" /></a>
      </div>
      <div className="navbar-right">
        {!user &&
        <>
          <Link to="/login"><button className='btn' style={{"marginRight": "20px"}}>Log In</button></Link>
          <Link to="/signup"><button className='btn' >Sign Up</button></Link>
        </>
      }
        {user ?
        <>
        <span className="navbar-username">{user.displayName}</span>
        <Link to={`/profile/${user.uid}`}>
        <img src={user.photoURL} alt="Profile" className="navbar-profile" />
        </Link>
        <button onClick={handleClick} className='btn'style={{"marginRight": "10px"}}>Friends</button>
        <button className="btn" onClick={logout}>Log Out</button>
        </>
        : null}
      </div>
    </nav>
    {firendsTab &&
    <div className='nav-friends'>
      <Friends />
    </div>
    }
    </>
  )
}
