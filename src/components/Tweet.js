import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import {dbService} from "fbase"
import { useState } from "react";

function Tweet({tweetObj, isOwner}){
    const [editing, setEditing] = useState(false)
    const [newTweet, setNewTweet] = useState(tweetObj.text);
    const onDeleteClick = async() =>{
        const ok = window.confirm("Are you sure you want to delete this tweet");
        console.log(ok)
        if(ok){
            await deleteDoc(doc(dbService, "tweet", `${tweetObj.id}`));
        } 
    }

    const toggleEditing = () => {
        setEditing(prev => !prev);
    }
    
    const onChange = e =>{
        const {value}= e.target
        setNewTweet(value)
        console.log(value)
    }

    const onSubmit= async(e) =>{
        e.preventDefault();
        const updateTweet = doc(dbService, "tweet", `${tweetObj.id}`);
        await updateDoc(updateTweet, {
            text : newTweet
        });
        setEditing(false);

    }

    return(
        <div>
            {
                editing ? (
                <>
                    <form onSubmit={onSubmit} >
                        <input onChange={onChange} type="text" placeholder="Edit" value={newTweet} required />
                        <input type="submit" value="Update Tweet"/>
                    </form>
                    <button onClick={toggleEditing}>Cancel</button>
                </>
                ) : (
                <>
                    <h4>{tweetObj.text}</h4>
                    {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>Delete Tweet</button>
                            <button onClick={toggleEditing}>Edit Tweet</button>
                        </>
                    )}
                </>
            )}
        </div>
    )
}

export default Tweet;