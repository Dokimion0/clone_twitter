import AppRouter from "components/Router.js";
import { useState } from "react";
import {authService} from "fbase"

function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(authService.currentUser)
  return ( <AppRouter isLoggedIn={isLoggedIn}/>

  );
}

export default App;
