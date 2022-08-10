import { useState } from "react";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import AuthForm from "components/AuthForm";

function Auth({refreshUser}){
   
    
    const onSocialClick = async (e) =>{
        const auth = getAuth();
        const {target:{name}} = e;
        let provider;
        if(name==="google"){
            provider = new GoogleAuthProvider();
        } else if(name==="github"){
            provider = new GithubAuthProvider();
        }
        const data = await signInWithPopup(auth, provider)
    }
    return(
        <> 
            <AuthForm refreshUser={refreshUser}/>
            <div>
                <button name="google" onClick={onSocialClick}>Continue with Google</button>
                <button name="github" onClick={onSocialClick}>Continue with Github</button>
            </div>
        </>    
    )
}

export default Auth;