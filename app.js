const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require('cookie-session');
const passport = require('passport');
const cors = require('cors');

// import the mongodb uri
const config = require("./config/config")

// import the authentication router
const authRouter = require("./routes/authRoutes");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieSession({
    maxAge : 24 * 60 * 60 * 1000,
    keys : [config.session.cookieKey]
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Connecting to the MongoDB
mongoose.connect(config.mongodb.dbURI, {useUnifiedTopology:true, useNewUrlParser:true})
.then(() => {
    console.log("Connected successfully to DB");
})
.catch(err => {
    console.log(err);
})

// Testing route
app.get("/api", (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-type', 'application/json');
  if(req.user){
    res.send({isLoggedIn : true})
  }
  else {
    res.send({isLoggedIn : false})
  }
});

// Set up authentication routes
app.use("/auth", authRouter);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App is now listening for requests on port ${PORT}`);
});
