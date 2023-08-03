const express = require("express");
const app = express();
const cors =require("cors");
app.use(express.json());
require('dotenv').config();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true , limit: '50mb'}))

const userRouter = require("./routers/userRouter.js")
const linkRouter = require('./routers/linkRouter.js');
const profileRouter = require('./routers/profileRouter.js')

app.use(
    cors({
        origin:"*"
    })
);
 

app.use("/links", linkRouter)
app.use("/user", userRouter);
app.use("/profile", profileRouter)


const PORT = 3636
app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
});