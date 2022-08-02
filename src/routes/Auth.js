import { useState } from "react";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

function Auth(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState('')
    const onChange = e =>{
        const {target: {name,value}} = e
        console.log(e.target.value)

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
            }
            else{
                data = await signInWithEmailAndPassword(auth, email, password)
            }
            console.log(data)
        } catch (error){
            setError(error.message)
        }
    };

    const toggleAccount = () => setNewAccount(prev => !prev)
    return(
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" type="text" placeholder="Email" 
                required value={email} onChange={onChange}/>
                <input name="password" type="password" placeholder="Password" 
                required value={password} onChange={onChange}/>
                <input type="submit" value={newAccount ? "Create Account" : "Log In"}/>
                {error}
            </form>
            <div>
                <button>Continue with Google</button>
                <button>Continue with Github</button>
            </div>
            <span onClick={toggleAccount}>{newAccount ? "Sign In" :"Create Account"}</span>
        </div>
    )
}

export default Auth;