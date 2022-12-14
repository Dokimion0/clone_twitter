import { dbService, storageService } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

function TweetFactory({userObj}){
    const [tweet, setTweet] = useState('');
    const [attachment, setAttachment] = useState('');

    const onSubmit = async(e) =>{
        e.preventDefault();
        let attachmentUrl ='';
        if(attachment != ''){
            const attachmentRef = ref(storageService, `${userObj.uid}`);
            const response = await uploadString(attachmentRef,attachment,"data_url")
            attachmentUrl = await getDownloadURL(attachmentRef)
            setAttachment('');
        }
        const tweetObj = {
            text : tweet,
            createdAt: Date.now(),
            creatorId : userObj.uid,
            attachmentUrl
        }
            await addDoc(collection(dbService, "tweetObj"),tweetObj);
            setTweet('');
            setAttachment('');
    }
    const onChange= e =>{
        const {target:{value}} = e
        setTweet(value)
    }

    const onFileChange = e => {
        const {files} = e.target;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onload = (finishedEvent =>{
            const {result} = finishedEvent.currentTarget;
            setAttachment(result);
        })
        reader.readAsDataURL(theFile);        
    }

    const onClearAttachment = () => setAttachment(null)

    return(
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
                <input className="factoryInput__input"
                value ={tweet} onChange={onChange}type="text" 
                placeholder="What's on your mind?" maxLength={120}/>
                <input type="submit" value="&rarr;" className="factoryInput__arrow" />
            </div>
            <label htmlFor="attach-file" className="factoryInput__label">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
                <input id="attach-file"
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    style={{
                    opacity: 0,
                    }}
                />
                {attachment && (
                    <div>
                        <img src={attachment} style={{backgroundImage: attachment,}}/>
                        <div className="factoryForm__clear" onClick={onClearAttachment}>
                            <span>Remove</span>
                            <FontAwesomeIcon icon={faTimes} />
                        </div>
                    </div>
                )}
            </form>
    )
}

export default TweetFactory