import React, {useContext, useState} from "react";
import UserContext from "./context/UserContext.js"
import {Redirect} from "react-router-dom";
import {Image} from "cloudinary-react"
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

import Input from "@material-ui/core/Input";
import Axios  from "axios"
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./styles/FormStyles";


 function Account(props) {

    const { userData} = useContext(UserContext);
    const { classes } = props;
    const [fileData, setFileData] = useState();
    const [images, setFile] = useState("");

    const handleFileChange= ({target}) => {
      setFileData(target.files[0])
      setFile(target.value);
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      const formdata = new FormData();

    formdata.append("image", fileData)

    await Axios.post("http://localhost:5000/users/image", formdata)
      .then((res) => console.log("res", res.data))
      
      .catch((error) => console.log(error))
    }

    
  
    return(
     <div>
      
{userData.user ?
    (
    <>
     <h1>Set up your Profile</h1>

        
        <form onSubmit={handleSubmit} encType="multipart/form-data">
      
         <Input
          type="file"
         accept="image/*"
         value={images}
        name="file"
        filname="image"
        onChange={handleFileChange}
        placeholder="upload image"
        isRequired={true}
           />
            <Button
            
              variant='contained'
              type='submit'
              color='primary'
             
            >
          Upload
            </Button>
       
        </form>
        
   
           
       
    
    </>


) : (
    <Redirect to="/Login"/>
     ) }
     </div>
    )
}


 
 



export default withStyles(styles)(Account)