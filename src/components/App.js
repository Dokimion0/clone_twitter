import AppRouter from "components/Router.js";
import { useEffect, useState } from "react";
import {authService} from "fbase"
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [init, setInit] =useState(false)
  const [isLoggedIn,setIsLoggedIn] = useState(false)
  useEffect(()=>{
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if(user){
        setIsLoggedIn(true)
      } else{
        setIsLoggedIn(false)
      }
      setInit(true)
    });
  },[])

  return ( 
    <>
    {init ? <AppRouter isLoggedIn={isLoggedIn}/> : "Init"}
    </>
  );
}

export default App;
