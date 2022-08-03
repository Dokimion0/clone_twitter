import { useState } from "react";
import {dbService} from "fbase"
import { addDoc, collection} from 'firebase/firestore';

function Home(){
    const [tweet, setTweet] = useState('');
    const onSubmit = async(e) =>{
        e.preventDefault();
        try{
            const docRef = await addDoc(collection(dbService, "users"), {
            tweet,
            createdAt: Date.now(),
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
        </div>
    )
}

export default Home;