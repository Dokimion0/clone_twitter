import { getAuth } from "firebase/auth";
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import AuthForm from "components/AuthForm";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

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
        <div className="authContainer">
            <FontAwesomeIcon
                icon={faTwitter}
                color={"#04AAFF"}
                size="3x"
                style={{ marginBottom: 30 }}
        />
            <AuthForm />
            <div className="authBtns">
                <button className="authBtn" name="google" onClick={onSocialClick}>
                    Continue with Google<FontAwesomeIcon icon={faGoogle} />
                </button>
                <button className="authBtn" name="github" onClick={onSocialClick}>
                    Continue with Github<FontAwesomeIcon icon={faGithub} />
                </button>
            </div>
        </div>
    )
}

export default Auth;