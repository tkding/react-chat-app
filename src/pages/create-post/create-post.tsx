import React, { useEffect } from 'react';

import { CreateForm } from './create-form';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';
import { useNavigate } from "react-router-dom";
// import { collection, getDocs } from 'firebase/firestore';

import { AppContext } from '../../App';
import { useContext } from 'react';

export const CreatePost = () => {
    const [ user ] = useAuthState(auth);
    const navigate = useNavigate();

    const { postsList } = useContext(AppContext);

    useEffect(() => {
        if(!user) {
            navigate("/");
        };

        // const postsRef = collection(db, "posts");
        // const getPosts = async () => {
        //     const data = await getDocs(postsRef);
        //     setPostsList(data.docs.map(doc => ({...doc.data(), id: doc.id})) as IPost[] );
        // }
        // getPosts();

        // if postsList of userId = user.uid is not null and length is greater than 5, don't create new post and alert the user
        if ( postsList && postsList.filter(post => post.userId === user?.uid).length >= 5 ){
            alert("You have reached the maximum number of posts allowed.");
            navigate(`/user/${user?.displayName}`);
        }
    }, []);

    return (
        <div className="form-container">
            <h1>Create post page</h1>
            <CreateForm />
        </div>
    );
}