import { dbService } from "fbase";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";


function Profile({refreshUser, userObj}){
    const navigate = useNavigate();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const onLogOutClick =()=>{
        const auth = getAuth();
        signOut(auth);
        navigate("/")
    }

    const getMyTweets = async() => {
        const myTweets =  query(collection(dbService, "tweetObj"), where("creatorId",
        "==",userObj.uid), orderBy("createdAt","desc"))
        const tweets = await getDocs(myTweets)
        // tweets.forEach((doc) => {
        //     console.log(doc.id, ' => ', doc.data());
        // });
    }
    useEffect(()=>{
        getMyTweets();
    },[])

    const onChange = e => {
        const {
            target : {value},
        } = e;
        setNewDisplayName(value);
    }
    const onSubmit = async(e) => { 
        e.preventDefault();
        const auth = getAuth();
        if(userObj.displayName !== newDisplayName){
            await updateProfile(auth.currentUser,{
                displayName : newDisplayName,
            });
            refreshUser();
        }
    }


    return(
     <div className="container">
        <form onSubmit={onSubmit} className="profileForm">
            <input onChange={onChange} className="formInput" type="text" placeholder="Display name" value={newDisplayName}/>
            <input type="submit" value="Update Profile" 
            style={{
                marginTop: 10,
            }}/>
        </form>
        <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
            Log Out
        </span>
    </div>
    )
}

export default Profile;