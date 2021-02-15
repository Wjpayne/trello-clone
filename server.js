const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors());
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config();

app.use(cors())

const port = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  if (process.env.NODE_ENV !== "production") {
    const mongoDB = mongoose.connection;
  
    mongoDB.on("open", () => {
      console.log("MongoDB is connected");
    });
    mongoDB.on("error", (error) => {
      console.log(error);
    });

    //logger
app.use(morgan("combined"));
}

//body parser

app.use(express.json());

const userRouter = require("./Routes/UserRoute")
const authRouter = (require("./Routes/AuthRoutes"))
const boardRouter = require("./Routes/BoardRoutes")
const listsRouter = require("./Routes/ListRoutes")
const cardRouter = require("./Routes/CardRoutes")
const checklistRouter = require("./Routes/ChecklistRoutes")

app.use("/user", userRouter)
app.use("/auth", authRouter)
app.use("/boards", boardRouter) 
app.use("/list", listsRouter)
app.use("/cards", cardRouter)
app.use("/checklists", checklistRouter)



app.use((req, res, next) => {
  const error = new Error("Nothing here!");
  error.status = 404;
  next(error);
});



app.listen(port, () => {
  console.log({ port });
});

