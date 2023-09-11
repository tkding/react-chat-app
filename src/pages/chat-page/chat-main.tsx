import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";
import React, { useState, useContext } from "react";
import { Auth } from "../../components/Auth";
import { Chat } from "./Chat";
import { AppContext } from "../../App";

export interface ChatProps {
    room: number | null;
}

// import Cookies from 'universal-cookie';
// const cookies = new Cookies(); // outside function
// const [isAuth, setIsAuth] = React.useState(cookies.get("auth-token")); // in function
export const ChatMain = () => {
    const [user] = useAuthState(auth);
    
    // const [room, setRoom] = useState<number | null>(null);
    const { room, setRoom } = useContext(AppContext);

    const [newRoom, setNewRoom] = useState<number>(0);
    const regex = /^[0-9]{1}$/;

    // const roomInputRef = useRef<HTMLInputElement>(null);
    const handleRoomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(regex.test(event.target.value)){
            setNewRoom(parseInt(event.target.value));
        }
    }

    const handleRoomClick = () => {
        if(regex.test(newRoom.toString())){
            setRoom(newRoom);
        } else {
            alert("Please enter a number between 1 and 9");
        }
    }

    if(!user) {
        return (
        <div className="App">
            <h2> Please Log in to continue.</h2>
            <Auth />
        </div>
        );
    }

    else{
        return (
        <div className="chat-room-container">
            {room ? (
                <div className="in-chat-room-container">
                    <h1 title="room-title">Room: {room}</h1>
                    <button onClick={() => setRoom(null)}>Leave Room</button>
                    <Chat ChatProps={{ room }} />
                </div>
            ) : (
                <div> 
                    <label>Select Room Number(1-9): </label>
                    {/* <input type="number" ref={roomInputRef} min={0} max={9} /> */}
                    {/* <button onClick={() => roomInputRef.current && setRoom(parseInt(roomInputRef.current.value))}>
                        Enter Room
                    </button> */}
                    <input 
                        id="room-input"
                        type="number" 
                        value={newRoom} 
                        onChange={handleRoomChange}
                        // maxLength={1} 
                        // min={0} 
                        // max={9} 
                    />
                    <button onClick={handleRoomClick}>
                        Enter Room
                    </button>
                </div>
            )} 
        </div>
        )
    };    
};