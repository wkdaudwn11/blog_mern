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
router.get('/', authCheck, (req, res) => { // authCheck를 넣었기 때문에, header - Authorization 에 JWT값이 있어야함.
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

/**
 * @route   POST api/profile
 * @desc    Create or edit user profile
 * @access  Private
 */
router.post('/', authCheck, (req, res) => {
    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.company) profileFields.company = req.body.company;
    if(req.body.website) profileFields.website = req.body.website;
    if(req.body.location) profileFields.location = req.body.location;
    if(req.body.bio) profileFields.bio = req.body.bio;
    if(req.body.status) profileFields.status = req.body.status;
    if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;

    // Skills - Snilt into array
    if(typeof req.body.skills !== 'undefined'){
        profileFields.skills = req.body.skills.split(',');
    }

    // Social
    profileFields.social = {};
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram;

    profileModel.findOne({user: req.user.id})
        .then(profile => {

            if(profile){ // 이미 존재한다면 update
                profileModel
                    .findOneAndUpdate(
                        {user: req.user.id},
                        {$set: profileFields},
                        {new: true}
                    )
                    .then(profile => res.json(profile))
                    .catch(err => res.json(err));

            }else{ // 없다면 insert
                // check if handle exists
                profileModel
                    .findOne({handle: profileFields.handle})
                    .then(profile => {
                        if(profile){
                            errors.handle = 'That handle already exists';
                            res.status(400).json(errors);
                        }
                        new profileModel(profileFields)
                            .save()
                            .then(profile => res.json(profile))
                            .catch(err => res.json(err));
                    })
                    .catch(err => res.json(err));
            }
            
        })
        .catch(err => res.json(err));

});

module.exports = router;