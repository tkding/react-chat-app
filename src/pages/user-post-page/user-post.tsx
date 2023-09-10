import { useAuthState } from "react-firebase-hooks/auth";
import { Post as IPost } from "../../App";
import { auth, db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { collection, deleteDoc, getDocs, query, where, doc, documentId } from "firebase/firestore";
import { setUncaughtExceptionCaptureCallback } from "process";

interface PostProps {
    post: IPost;
    setUserPostsList?: React.Dispatch<React.SetStateAction<IPost[]>>;
}

interface Likes {
    userId: string;
    id: String;
}

export const UserPost = (props: PostProps) => {
    const { post } = props;
    const [ user ] = useAuthState(auth);
    const [ likes, setLikes ] = useState<Likes[] | null>(null);
    
    const likesRef = collection(db, "likes");
    const likesDoc = query(likesRef, where("postId", "==", post.id));
    
    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map(doc => ({userId: doc.data().userId, id: doc.id})) as Likes[] );
    }

    const postsRef = collection(db, "posts");
    const handleDeletePost = async () => {
        try {
            // delete post from firestore
            const postToDeleteQuery = query(
                postsRef,
                where("userId", "==", user?.uid),
                where(documentId(), "==", post.id)
            );
            const postToDeleteData = await getDocs(postToDeleteQuery);
            const postId = postToDeleteData.docs[0].id;
            const postToDelete = doc(db, "posts", postId);
            await deleteDoc(postToDelete);

            // delete post from userPostsList
            props.setUserPostsList && props.setUserPostsList((prevState) => prevState.filter(post => post.id !== postId));
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect (() => {
        getLikes();
    }, []);

    return (
        <div className="Post">
            <div className="title">
                <h3>{post.title}</h3>
            </div>
            <div className="description">
                <p>{post.description}</p>
            </div>
            <div className="likes">                
                {likes && <p> 👍: {likes.length} </p>}
            </div>
            {user?.uid === post.userId &&
                <div className="delete-btn" onClick={handleDeletePost}>
                    <button>Delete</button>
                </div>
            }
        </div>
    )
};