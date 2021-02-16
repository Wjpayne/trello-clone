const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors());
const mongoose = require("mongoose");
require("dotenv").config();

app.use(cors())



// Connect database
(async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
})();



//body parser

app.use(express.json());

const userRouter = require("./Routes/UserRoute")
const authRouter = (require("./Routes/AuthRoutes"))
const boardRouter = require("./Routes/BoardRoutes")
const listsRouter = require("./Routes/ListRoutes")
const cardRouter = require("./Routes/CardRoutes")
const checklistRouter = require("./Routes/ChecklistRoutes")

app.use("/users", userRouter)
app.use("/auth", authRouter)
app.use("/boards", boardRouter) 
app.use("/lists", listsRouter)
app.use("/cards", cardRouter)
app.use("/checklists", checklistRouter)

//set route to load

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server started on port ' + PORT));
