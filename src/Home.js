import React, {useState, useContext} from "react";
import Account from "./Account.js"
import {useHistory, useLocation, Link, Redirect} from "react-router-dom";
import UserContext from "./context/UserContext.js"
import Button from "@material-ui/core/Button";

export default function Home() {
  const { userData, setUserData} = useContext(UserContext);
  const account= () => history.push("/Account");

  let history = useHistory();
    return (
      <div>
     { userData.user ? (
        <>
        <h1>Home</h1>
        <Button onClick={account}>Create profile picture</Button>
        <Account/>
        </>
    ) : (
      <Redirect to="/Login"/>
    )}
    </div>
)}