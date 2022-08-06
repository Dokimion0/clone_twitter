import { useEffect, useState } from "react";
import {dbService} from "fbase"
import { addDoc, collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import Tweet from "components/Tweet";

function Home({userObj}){
    const [tweet, setTweet] = useState('');
    const [tweets, setTweets] = useState([]);
    const [attachment, setAttachment] = useState()
    const getTweets = ()=>{
        const q = query(collection(dbService, "tweet"),orderBy("createdAt", "desc")        )
         onSnapshot(q, (querySnapshot) => {
            const tweetArray = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTweets(tweetArray)
        });
    }
    useEffect(()=>{
        getTweets();
    },[])
    const onSubmit = async(e) =>{
        e.preventDefault();
        try{
            const docRef = await addDoc(collection(dbService, "tweet"), {
            text : tweet,
            createdAt: Date.now(),
            creatorId : userObj.uid
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
        setTweet('');
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
        <div>
            <form onSubmit={onSubmit}>
                <input value ={tweet} onChange={onChange}type="text" placeholder="What's on your mind?" maxLength={120}/>
                <input type="file" accept="image/*" onChange={onFileChange}/>
                <input type="submit" value="tweet"/>
                {attachment && 
                    <div>
                        <img src={attachment} width="50px" height="50px" />
                        <button onClick={onClearAttachment}>Clear</button>
                    </div>
                }
            </form>
            <div>
                {tweets.map(tweet => (
                    <Tweet key={tweet.id} tweetObj={tweet} isOwner={tweet.creatorId === userObj.uid}/>
                ))}
            </div>
        </div>
    )
}

export default Home;