import logo from './logo.svg';
import './App.css';
import Axios from "axios";
import React, { useEffect, useState} from "react";
import UserContext from "./context/UserContext.js"
import {Switch, Route, Redirect} from "react-router-dom"
import Home from "./Home.js"
import Login from "./Login.js"

import Register from "./Register.js"
import ButtonAppBar from "./Navbar.js"
import Account from "./Account.js"


function App() {


  const [userData, setUserData] = useState({
        token: undefined,
        user: undefined
      })
 
  
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token")
      if (token === null){
        localStorage.setItem("auth-token", "")
        token="";
      }
      const tokenRes = await Axios.post(
        "http://localhost:5000/users/tokenisValid", null,
        {headers: {"x-auth-token" : token}}
      )
       if (tokenRes.data){
         const userRes = await Axios.get("http://localhost:5000/users", 
         {headers: {"x-auth-token" : token}})

         setUserData({
           token,
           user: userRes.data
         })
       }
    }

    checkLoggedIn();
  },[])




  
  return (
    <>
   <UserContext.Provider value={{userData, setUserData}}>
    <ButtonAppBar/>
    
     <Switch>
       <Route exact path="/" render={() => <Home/>}/>
       <Route exact path="/Login" render={() => <Login/>}/>
       <Route exact path="/Register" render={() => <Register/>}/>
       <Route exact path="/Account" render={() => <Account/>}/>
       
     </Switch> 
     </UserContext.Provider>
    </>
    
  )
}

export default App;
