// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const {registerValidation, loginValidation} = require('../validation');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
//
// //get all users
// router.get('/register', async (req, res) => {
//     try {
//         const posts = await User.find();
//         res.json(posts);
//     } catch (err) {
//         res.json({message: err});
//     }
// });
//
//
// //post one user
// router.post('/register', async (req, res) => {
//
//     //validating the user information
//     //this is causing an unhandled promise rejection
//     const {error} = registerValidation(req.body)
//         .catch((err) => console.log('Registration Failed'));
//     if (error) {
//         return res.status(400).send(res.send(error.details[0].message));
//     }
//
//
//     //checking if email already exists
//     const emailExists = await User.findOne({email: req.body.email});
//     if (emailExists) {
//         return res.status(400).send('Email already exists');
//     }
//
//     //Hash passwords
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(req.body.password, salt);
//
//     //creating a new user
//     const user = new User({
//         name: req.body.name,
//         email: req.body.email,
//         password: hashedPassword
//     });
//     try {
//         const savedUser = await user.save();
//         res.send({user: user._id});
//     } catch (e) {
//         res.status(400).send(e);
//     }
// });
//
//
// //LOGIN
// router.post('/login', async (req, res) => {
//
//     const {error} = loginValidation(req.body);
//     if (error) {
//         return res.status(400).send(res.send(error.details[0].message));
//     }
//
//     const user = await User.findOne({email: req.body.email});
//     if (!user) {
//         return res.status(400).send('Email does not exist');
//     }
//
//     //check if pass is correct
//     const validPass = await bcrypt.compare(req.body.password, user.password)
//
//     if (!validPass) {
//         return res.status(400).send('Invalid Password');
//     }
//
//     //create and assign token
//
//     //still throwing unhandled promise
//
//
//     try{
//         const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
//         res.header('auth-token', token).send(token);
//         //res.send('Logged in') this throws cannot set headers after set by client
//     }catch (e) {
//         console.log(e)
//     }
//
// });
//
//
// module.exports = router;