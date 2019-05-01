const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post Model
const postModel = require('../../models/postModel');

// Validation
const validatePostInput = require('../../validation/post');

// auth
const authCheck = passport.authenticate('jwt', {session: false});

/**
 * @route   GET api/post/test
 * @desc    Tests post route
 * @access  Public
 */
router.get('/test', (req, res) => res.json({msg: 'Post Works'}));

/**
 * @route   POST api/post
 * @desc    Create post
 * @access  Private
 */
router.post("/", authCheck, (req, res) => {
    const {errors, isValid} = validatePostInput(req.body);
    
    //check validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    const newPost = new postModel({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });

    newPost.save()
        .then(post => res.json(post))
        .catch(err => res.status(400).json(err));

});

module.exports = router;