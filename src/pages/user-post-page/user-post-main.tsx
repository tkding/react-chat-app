import { collection, orderBy, query, where } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useState, useEffect, useContext } from "react";
import { UserPost } from "./user-post";
import { getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { Post as IPost, AppContext } from "../../App";
import { useNavigate } from "react-router-dom";

export const UserPostMain = () => {
    const [user] = useAuthState(auth);
    
    const navigate = useNavigate();

    const userPostsListContext = useContext(AppContext).postsList?.filter(post => post.userId === user?.uid) as IPost[];
    const [userPostsList, setUserPostsList] = useState<IPost[]>(userPostsListContext);

    // const postsRef = collection(db, "posts");
    // const [postsList, setPostsList] = useState<IPost[]>([]);
    // const getPosts = async () => {
    //     try{
    //         const data = await getDocs(query(postsRef, where("userId", "==", user?.uid), orderBy("createAt", "desc")));
    //         setPostsList(data.docs.map(doc => ({...doc.data(), id: doc.id})) as IPost[] );
    //     }
    //     catch(error){
    //         console.log(error);
    //     }
    // }

    useEffect(() => {
        if(!user){
            alert("You must be logged in to view this page.");
            navigate("/");
        }

        // getPosts();
    }, []);

    return (
        <div>
            <h1>{user?.displayName} Posts</h1>
            {userPostsList?.map(post => (
                <UserPost key={post.id} post={post} setUserPostsList={setUserPostsList} />
                )
            )}
        </div>
    );
};