const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const app = express();

//Middlewares---
app.use(cors());

//Body-parser THIS MUST BE BEFORE THE ROUTE (i think)
//app.use(bodyParser.json());
//you don't need above, just use this
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Import Routes
// const postsRoute = require('./Routes/posts');
// app.use('/posts', postsRoute);
//
// const authRoute = require('./Routes/auth');
// app.use('/api/user', authRoute);
//
// //HOME ROUTE
// app.get('/', (req, res) => {
//     res.send('We are on home');
// });

//CONNECT TO DB
mongoose.connect(process.env.DB_CONNECTION,
    {useNewUrlParser: true},
    () => {
        console.log('connected to db')
    }
);

// const router = express.Router();
// app.use('/', router);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 3002;
app.listen(PORT);


