import { useContext } from "react";

// form hook,  yup, resolver
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// for firebase
import { auth, db } from "../../config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// for user
import { useAuthState } from "react-firebase-hooks/auth";

import { useNavigate } from "react-router-dom";

import { Post as IPost, AppContext } from "../../App";
import { time } from "console";

interface FormData {
    title: string;
    description: string;
}

export const CreateForm = () => {
    const [ user ] = useAuthState(auth);
    const navigate = useNavigate();
    const { postsList, setPostsList } = useContext(AppContext);

    // yup validation 
    const schema = yup.object().shape({
        title: yup.string().required("title is required"),
        description: yup.string().required("description is required"),
    });
    
    // form hook
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const postsRef = collection(db, "posts");

    // submit handler
    const onCreatePost = async (data: FormData) => {
        const newDoc = await addDoc(postsRef, {
            ...data,
            username: user?.displayName,
            userId: user?.uid,
            createAt: serverTimestamp()
        });
        
        // Update postsList
        if (user) {
            setPostsList((prev) => {
                const newPost = {
                    ...data,
                    username: user.displayName || "", // Assign an empty string if displayName is null
                    userId: user.uid || "", // Assign an empty string if uid is null
                    createAt: serverTimestamp(),
                    id: newDoc.id,
                };
            
                return prev ? [newPost, ...prev] : [newPost];
            });
        }


        navigate("/");
    };
    
    return (
        <form onSubmit={handleSubmit(onCreatePost)}>
            <input type="text" placeholder="Title" {...register("title")} />
            <p style={{color: "red"}}>{errors.title?.message}</p>
            <textarea placeholder="Description" {...register("description")} />
            <p style={{color: "red"}}>{errors.description?.message}</p>
            <input className="form-submit-btn" type="submit" />
        </form>
    );
};
