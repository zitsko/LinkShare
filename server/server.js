const express = require("express");
const app = express();
const cors = require("cors");
// app.use(express.json());
require("dotenv").config();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(
  cors({
      origin:"*"
  })
);

// app.use(
//   cors({
//     origin: ["https://link-share-elr8.onrender.com", "http://localhost:3000"],
//   })
// );


const userRouter = require("./routers/userRouter.js");
const linkRouter = require("./routers/linkRouter.js");
const profileRouter = require("./routers/profileRouter.js");

app.use("/links", linkRouter);
app.use("/user", userRouter);
app.use("/profile", profileRouter);

const PORT = process.env.PORT || 3636;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
