import React from 'react';
import { auth, provider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';

import Cookies from 'universal-cookie';
const cookies = new Cookies();


export const Auth = () => {
    const signInWithGoogle = async () => {
        try{
            const result = await signInWithPopup(auth, provider);
            cookies.set("auth-token", result.user?.refreshToken);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="auth"> 
             <p>Sing In With Google To Continue</p>
             <button onClick={() => signInWithGoogle()}>Sign In With Google</button>
        </div>);
}