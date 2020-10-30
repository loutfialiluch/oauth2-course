const express = require('express');

const app = express();

// import the authentication router
const authRouter = require('./routes/authRoutes');

// Testing route
app.get('/', (req, res) => {
    res.send("Hello world");
})

// Set up authentication routes 
app.use('/auth', authRouter);

app.listen(3000, () => {
    console.log('App is now listening for requests on port 3000')
})