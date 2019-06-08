const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const app = express();

//Middlewares---
app.use(cors());

app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.use('/posts', require('./Routes/posts'));
app.use('/api/user', require('./Routes/auth'));


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


