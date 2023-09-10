import React from 'react';

import { useState, useEffect, useContext } from 'react';

import { getDocs, collection, query, orderBy } from 'firebase/firestore';
import { auth, db } from "../../config/firebase";

import { Post } from './post';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Auth } from '../../components/Auth';

import { Post as IPost, AppContext } from '../../App'
 
// pagination
import ReactPaginate from 'react-paginate';

export const PostMain = () => {
    const [ user ] = useAuthState(auth);
    
    const postsRef = collection(db, "posts");
    const { postsList, setPostsList } = useContext(AppContext);

    const getPosts = async () => {
        try{
            const data = await getDocs(query(postsRef, orderBy("createAt", "desc")));
            setPostsList(data.docs.map(doc => ({...doc.data(), id: doc.id})) as IPost[] );
        } catch(error){
            console.log(error);
        }
    }

    useEffect (() => {
        user && getPosts();
    }, []);

    if ( !user ){
        return (
            <div className="App">
                <h2> Please Log in to continue.</h2>
                <Auth />
            </div>
        );
    };

    return (
        <div>
            <h1>Posts</h1>
            
            {postsList?.map(post => (
                <Post key={post.id} post={post}/>
                )
            )}
        </div>
    );
}
