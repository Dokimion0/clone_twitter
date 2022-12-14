import { authService } from "fbase";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

function AuthForm({refreshUser}){
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState('')
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const onChange = e =>{
        const {target: {name,value}} = e

        if(name === "email"){
            setEmail(value)
        } else if(name === "password"){
            setPassword(value)
        }
    };

    const onSubmit = async(e) =>{
        e.preventDefault();
        try{
            let data;
            const auth = getAuth();
            if(newAccount){
                data = await createUserWithEmailAndPassword(auth, email, password)
                refreshUser()
                console.log(authService.currentUser)
            }
            else{
                data = await signInWithEmailAndPassword(auth, email, password)
            }
        } catch (error){
            setError(error.message)
        }
    };

    const toggleAccount = () => setNewAccount(prev => !prev)
    return(
        <>
            <form onSubmit={onSubmit} className="container">
                <input name="email" type="text" placeholder="Email" 
                required value={email} onChange={onChange}/>
                <input name="password" type="password" placeholder="Password" 
                required value={password} onChange={onChange}
                className="authInput"/>
                <input type="submit" value={newAccount ? "Create Account" : "Log In"}
                className="authInput authSubmit"/>
                {error && <span className="authError">{error}</span>}
            </form>
            <span onClick={toggleAccount} className="authSwitch">
                {newAccount ? "Sign In" :"Create Account"}
            </span>
        </>
    )
}

export default AuthForm;