import {Link} from "react-router-dom"

function Navigation({userObj}){
    return(
    <>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/profile">{userObj.displayName}의 Profile</Link>
            </li>
        </ul>
    </>
    )
}

export default Navigation;