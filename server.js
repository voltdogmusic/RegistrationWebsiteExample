const express = require('express');
const app = express();
const mongoose = require('mongoose');
var cors = require('cors');
const Data = require('./models/data');
const router = express.Router();
app.use(cors());//DONT FORGET TO USE THE CORS PLUGIN ON CHROME

//you must npm i dotenv and include this require and set the DB_CONNECTION in .env
require('dotenv/config');
mongoose.connect(process.env.DB_CONNECTION,
    {useNewUrlParser: true},
    () => {
        console.log('connected to db')
    }
);

//BODY PARSER
app.use(express.urlencoded({extended: true}));
app.use(express.json());

router.get('/', (req, res) => {
    res.send('We are on /api');
});

router.get('/getData', (req, res) => {
    Data.find((err, data) => {
        if (err) return res.json({success: false, error: err});
        return res.json({success: true, data: data});
    });
});


// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

router.post('/updateData', (req, res) => {
    const {id, update} = req.body;
    Data.findByIdAndUpdate(id, update, (err) => {
        if (err) return res.json({success: false, error: err});
        return res.json({success: true});
    });
});

router.delete('/deleteData', (req, res) => {
    const {id} = req.body;
    Data.findByIdAndRemove(id, (err) => {
        if (err) return res.send(err);
        return res.json({success: true});
    });
});


router.post('/putData', (req, res) => {
    let data = new Data();

    const {id, message} = req.body;

    if ((!id && id !== 0) || !message) {
        return res.json({
            success: false,
            error: 'INVALID INPUTS',
        });
    }
    data.message = message;
    data.id = id;
    data.save((err) => {
        if (err) return res.json({success: false, error: err});
        return res.json({success: true});
    });
});


app.use('/api', router);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 3002;
app.listen(PORT);