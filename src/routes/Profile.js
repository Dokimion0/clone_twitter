import { getAuth, signOut } from "firebase/auth";
import {useNavigate} from "react-router-dom"


function Profile(){
    let navigate = useNavigate();

    const onLogOutClick =()=>{
        const auth = getAuth();
        signOut(auth);
        navigate("/")
    }
    return(
    <>
        <button onClick={onLogOutClick}>Log Out</button>
    </>
    )
}

export default Profile;