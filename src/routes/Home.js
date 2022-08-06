import { useEffect, useState } from "react";
import {dbService} from "fbase"
import { addDoc, collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import Tweet from "components/Tweet";

function Home({userObj}){
    const [tweet, setTweet] = useState('');
    const [tweets, setTweets] = useState([]);
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
    return(
        <div>
            <form onSubmit={onSubmit}>
                <input value ={tweet} onChange={onChange}type="text" placeholder="What's on your mind?" maxLength={120}/>
                <input type="submit" value="tweet"/>
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