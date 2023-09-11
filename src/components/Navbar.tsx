import React from "react";
import './Navbar.css';
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { signOut } from 'firebase/auth';

export const Navbar = () => {
    const [user] = useAuthState(auth);

    const signUserOut = async () => {
        await signOut(auth);
    }
    
    return (
        <div className="navbar">
            <div className="left-links">
                <Link to="/">Home</Link>
                <Link to={`/user/${user?.displayName}`}>My Posts</Link>
                <Link to="/createpost">Create Post</Link>
                <Link to="/chat">Chat</Link>
            </div>
        
            {user && (
                <div className="right-content">
                    <p className="log-in-text"> Logged in as {user?.displayName}</p>   
                    <img className="profile-pic" src={user?.photoURL || ''} width="25" height="25" alt="user" />  
                    <button className="sign-out-btn" onClick={signUserOut}>Sign Out</button>
                </div>
            )}
            
            <h1 className="project-title">FurRya</h1>    
        </div>
    );
}