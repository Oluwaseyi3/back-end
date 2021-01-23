require("dotenv").config();
const express = require("express");
const bcrypt=require("bcryptjs")
const cors = require("cors");
const mongoose = require("mongoose");
const morgan= require("morgan")
const bodyParser = require("body-parser")
const path = require("path")
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(
    bodyParser.urlencoded({
     extended: true
    })
)

app.use(express.urlencoded({ extended: true}))



mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err) => {
    if (err) throw err
    console.log("MongoDB1 Connected");
})





const PORT = process.env.PORT || 5000;




app.listen(PORT, () => console.log(`The Server has started on port: ${PORT}`));




app.use("/users", require("./routes/userRouter"))

app.use("/api", require("./routes/uploadImageRouter") )

