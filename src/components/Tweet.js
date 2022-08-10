import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import {dbService, storageService} from "fbase"
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";



function Tweet({tweetObj, isOwner}){
    const [editing, setEditing] = useState(false)
    const [newTweet, setNewTweet] = useState(tweetObj.text);
    const onDeleteClick = async() =>{
        const ok = window.confirm("Are you sure you want to delete this tweet");
        if(ok){
            await deleteDoc(doc(dbService, "tweetObj", `${tweetObj.id}`));
            if(`${tweetObj.attachmentUrl}`){
                await deleteObject(ref(storageService, `${tweetObj.attachmentUrl}`));
            }
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
        const updateTweet = doc(dbService, "tweetObj", `${tweetObj.id}`);
        await updateDoc(updateTweet, {
            text : newTweet
        });
        setEditing(false);

    }

    return(
        <div className="nweet">
            {
                editing ? (
                <>
                    <form onSubmit={onSubmit} className="container nweetEdit">
                        <input onChange={onChange} type="text" placeholder="Edit" value={newTweet} required className="formInput"/>
                        <input type="submit" value="Update Tweet" className="formInput"/>
                    </form>
                    <span onClick={toggleEditing} className="formBtn cancelBtn">
                        Cancel
                    </span>
                </>
                ) : (
                <>
                    <h4>{tweetObj.text}</h4>
                    {tweetObj.attachmentUrl && (<img src={tweetObj.attachmentUrl}></img>)}
                    {isOwner && (
                        <div class="nweet__actions">
                            <span onClick={onDeleteClick}>
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                            <span onClick={toggleEditing}>
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </span>
                        </div>
                    )}
                </>
                )
            }
            </div>
        )
    }

export default Tweet;