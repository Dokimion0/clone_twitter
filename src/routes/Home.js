import { useEffect, useState } from "react";
import {dbService, storageService} from "fbase"
import { addDoc, collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { v4 as uuidv4} from 'uuid'
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import Tweet from "components/Tweet";
import Profile from "routes/Profile"
import TweetFactory from "components/TweetFactory";

function Home({userObj}){
    const [tweets, setTweets] = useState([]);
    const getTweets = ()=>{
        const q = query(collection(dbService, 'tweetObj'),orderBy("createdAt", "desc")        )
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
    

    return(
        <div className="container">
            <TweetFactory userObj = {userObj}/>
            <div style={{ marginTop: 30 }}>
                {tweets.map(tweet => (
                    <Tweet key={tweet.id} tweetObj={tweet} isOwner={tweet.creatorId === userObj.uid}/>
                ))}
            </div>
        </div>
    )
}

export default Home;