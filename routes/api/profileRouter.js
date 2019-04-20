const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const profileModel = require('../../models/profileModel');
const userModel = require('../../models/userModel');

const authCheck = passport.authenticate('jwt', {session: false});

/**
 * @route   GET api/profile/test
 * @desc    Tests profile route
 * @access  Public
 */
router.get('/test', (req, res) => res.json({msg: 'Profile Works'}));

/**
 * @route   GET api/profile
 * @desc    Get current users profile
 * @access  Private
 */
router.get('/', authCheck, (req, res) => {
    const errors = {};

    profileModel.findOne({user: req.user.id})
        .then(profile => {
            if(!profile){
                errors.noprofile = 'There is no profile for this user';
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.json(err));
});

module.exports = router;