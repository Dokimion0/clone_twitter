import AppRouter from "components/Router.js";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { authService } from "fbase";

function App() {
  const [init, setInit] =useState(false);
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(()=>{
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if(user){
        setIsLoggedIn(true)
        setUserObj({
          displayName : user.displayName,
          uid : user.uid,
          updateProfile : (args) => user.updateProfile(args),
        })
      } else{
        setIsLoggedIn(false)
      }
      setInit(true)
    });

  },[])
  const refreshUser = () => {
    const user = authService.currentUser;
    if (user.displayName === null) {
      user.displayName = user.email.split("@")[0];
      }
    setUserObj({
      displayName : user.displayName,
      uid : user.uid,
      updateProfile : (args) => user.updateProfile(args),})
   
  }

  return ( 
    <>
    {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={isLoggedIn} userObj={userObj}/> : "Init"}
    </>
  );
}

export default App;
