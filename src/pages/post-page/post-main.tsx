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

interface Pagination{
    data: IPost[] | null;
    offset: number;
    numberPerPage: number;
    pageCount: number;
    currentData: IPost[] | null;
}

export const PostMain = () => {
    const [ user ] = useAuthState(auth);

    const postsRef = collection(db, "posts");
    const { postsList, setPostsList } = useContext(AppContext);
    const getPosts = async () => {
        try{
            const data = await getDocs(query(postsRef, orderBy("createAt", "desc")));
            setPostsList(data.docs.map(doc => ({...doc.data(), id: doc.id})) as IPost[] );
        }
        catch(error){
            console.log(error);
        }
    }

    const [pagination, setPagination] = useState<Pagination>({
        data: postsList,
        offset: 0,
        numberPerPage: 10,
        pageCount: 0,
        currentData: []
    });

    useEffect (() => {
        user && getPosts();
        setPagination((prevState) => ({
            ...prevState,
            pageCount: Math.ceil((prevState.data? prevState.data.length : 1)/ prevState.numberPerPage),
            currentData: prevState.data?.slice(pagination.offset, pagination.offset + pagination.numberPerPage) as IPost[]
        }))
    }, [postsList]);

    const handlePageClick = (event: any) => {
        const selected = event.selected;
        const offset = selected * pagination.numberPerPage;
        setPagination({...pagination, offset: offset});
    }

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

            {pagination.currentData ? pagination.currentData.map(post => (
                <Post key={post.id} post={post}/>
                )
            ) : (
                <h2> No Post</h2>
            )}

            <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                pageCount={pagination.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
            />

            {/* {postsList?.map(post => (
                <Post key={post.id} post={post}/>
                )
            )} */}
        </div>
    );
}
