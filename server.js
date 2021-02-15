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
const boardRouter = require("./Routes/BoardRoutes")

app.use("/user", userRouter)
app.use("/boards", boardRouter) 



app.use((req, res, next) => {
  const error = new Error("Nothing here!");
  error.status = 404;
  next(error);
});



app.listen(port, () => {
  console.log({ port });
});

