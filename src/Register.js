import React, {useState, useContext} from "react";
import { useHistory} from "react-router-dom"
import UserContext from "./context/UserContext.js"
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./styles/FormStyles";
import axios from "axios";

 function Register(props) {
  const { classes } = props;
  const [email, setEmail]= useState();
  const [password, setPassword]= useState();
  const [passwordCheck, setPasswordCheck]= useState();
  const [displayName, setDisplayName]= useState();

  const { setUserData} = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
     e.preventDefault();
     const newUser = {email, password, passwordCheck, displayName}
     await axios.post("http://localhost:5000/users/register", newUser)

     const loginRes = await axios.post("http://localhost:5000/users/login", {
       email, password
     });
     setUserData({
       token: loginRes.data.token,
       user: loginRes.data.user
     })
     localStorage.setItem("auth-token", loginRes.data.token)
     history.push("/");
  }
  
    return (
      <div>
       
       <main className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant='h5'>Sign In</Typography>
          
          <form className={classes.form} onSubmit={submit}>
            <FormControl margin='normal' required fullWidth>
              <InputLabel htmlFor='register-email'>Email</InputLabel>
              <Input id='register-email' name='email' autoFocus 
               onChange={ e => setEmail(e.target.value)} autoComplete="false"/>
            </FormControl>

            <FormControl margin='normal' required fullWidth>
              <InputLabel htmlFor='register-password'>Password</InputLabel>
              <Input id='register-password' name='password' type='password' autoFocus
               onChange={ e => setPassword(e.target.value)}
               />
              </FormControl>

              <FormControl margin='normal' required fullWidth>
              <InputLabel htmlFor='register-password'>Verify Password</InputLabel>
              <Input type='password' name="password" autoFocus
              onChange={ e => setPasswordCheck(e.target.value)}/> 
            </FormControl>

            <FormControl margin='normal' required fullWidth>
              <InputLabel htmlFor='register-display-name'>Display Name</InputLabel>
              <Input id='email' name='email' type="text" 
                onChange={ e => setDisplayName(e.target.value)} 
              />
            </FormControl>

            
            <Button
            
              variant='contained'
              type='submit'
              fullWidth
              color='primary'
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>
        </Paper>
      </main>
      </div>
    )
}


export default withStyles(styles)(Register)