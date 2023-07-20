const express = require("express");
const app = express();
const cors =require("cors");
app.use(express.json());
require('dotenv').config();


const userRouter = require("./routers/userRouter.js")

app.use(
    cors({
        origin:"*"
    })
);

app.use("/user", userRouter);

const PORT = 3636
app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
});