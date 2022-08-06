import { doc, deleteDoc } from "firebase/firestore";
import {dbService} from "fbase"
import { useState } from "react";

function Tweet({tweetObj, isOwner}){
    const [editing, setEditing] = useState(false)
    const [newTweet, setTweet] = useState(tweetObj.text);
    const onDeleteClick = async() =>{
        const ok = window.confirm("Are you sure you want to delete this tweet");
        console.log(ok)
        if(ok){
            await deleteDoc(doc(dbService, "tweet", `${tweetObj.id}`));
        } 
    }
    const toggleEditing = () => {
        setEditing(prev => !prev);
        if(editing){
        }
    }

    return(
        <div>
            {
                editing ? (
                <>
                    <form>
                        <input type="text" placeholder="Edit" value={newTweet} required />
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