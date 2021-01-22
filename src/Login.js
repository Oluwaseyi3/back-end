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
import ErrorNotice from "./error/ErrorNotice.js"


 function Login(props) {

  const { classes } = props;
  const [email, setEmail]= useState();
  const [password, setPassword]= useState();
  const [error, setError]= useState();


  
  const { setUserData} = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    const loginUser = {email, password}

    try{
  
 const loginRes = await axios.post("http://localhost:5000/users/login", loginUser);

    setUserData({
      token: loginRes.data.token,
      user: loginRes.data.user
    })
    localStorage.setItem("auth-token", loginRes.data.token)
    history.push("/Account");
  } catch(err){
    err.response.data.msg && setError(err.response.data.msg)
  }
 }


    return (
      <div>
          <main className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant='h5'>Login</Typography>
          {error && (
            <ErrorNotice message={error} clearError={() => setError(undefined)}/>
          )}
          
          <form className={classes.form} onSubmit={submit}>
            <FormControl margin='normal' required fullWidth>
              <InputLabel htmlFor='login-email'>Email</InputLabel>
              <Input id='login-email' name='email' autoFocus 
               onChange={ e => setEmail(e.target.value)} autoComplete="false"/>
            </FormControl>

            <FormControl margin='normal' required fullWidth>
              <InputLabel htmlFor='login-password'>Password</InputLabel>
              <Input id='login-password' name='password' type='password' autoFocus
               onChange={ e => setPassword(e.target.value)}
               />
              </FormControl>

            
            <Button
            
              variant='contained'
              type='submit'
              fullWidth
              color='primary'
              className={classes.submit}
            >
            Log In
            </Button>
          </form>
        </Paper>
      </main>
      </div>
    )
}







export default withStyles(styles)(Login)