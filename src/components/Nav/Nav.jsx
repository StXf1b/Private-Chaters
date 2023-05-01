import React from 'react'
import "./Nav.css"
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';

export default function Nav() { 
    const { user } = useAuthContext();
    const { logout } = useLogout();
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2><a href='/'>Private Chaters</a></h2>
      </div>
      <div className="navbar-right">
        
        {user ?
        <>
        <span className="navbar-username">{user.displayName}</span>
        <a href={`/profile/${user.uid}`}>
        <img src={user.photoURL} alt="Profile" className="navbar-profile" />
        </a>
        <button className="btn" onClick={logout}>Log Out</button>
        </>
        : null}
      </div>
    </nav>
  )
}
