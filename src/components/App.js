import AppRouter from "components/Router.js";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [init, setInit] =useState(false);
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(()=>{
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if(user){
        setIsLoggedIn(true)
        setUserObj(user)
      } else{
        setIsLoggedIn(false)
      }
      setInit(true)
    });
  },[])

  return ( 
    <>
    {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/> : "Init"}
    </>
  );
}

export default App;
