import { Route, Routes, Link } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

function AppRouter({isLoggedIn}){
    return(
            <Routes>                          
                <Route path="/" element={'MainPage'} />
                { isLoggedIn ? 
                 <Route path ="/Home" element={<Home/>}/> : 
                <Route path ="/Auth" element={<Auth/>}/>
                }
            </Routes>
    );
};

export default AppRouter;