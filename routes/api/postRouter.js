const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Model
const postModel = require('../../models/postModel');
const profileModel = require('../../models/profileModel');

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

/**
 * @route   Get api/post
 * @desc    Get post
 * @access  Public
 */
router.get("/", (req,res) => {
    postModel.find()
        .sort({date: -1}) // -1은 내림차순, 1은 오름차순
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({nopostsfound: 'No posts found'}));
});

/**
 * @route   Get api/post/:id
 * @desc    Get post by id
 * @access  Pubild
 */
router.get("/:id", (req,res) => {
    postModel.findById(req.params.id)
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json(err));
});

/**
 * @route   Delete api/post/:id
 * @desc    Delete post by id
 * @access  private
 */
router.delete("/:id", authCheck, (req,res) => {
    profileModel.findOne({user: req.user.id}).then(profile => {
        postModel.findById(req.params.id)
            .then(post => {
                // check for post owner
                if(post.user.toString() !== req.user.id){ // 로그인 한 사람과 작성한 사람이 다르면 에러처리 (자신의 글만 삭제 되야 하기 때문)
                    return res.status(404).json({noauthorized: 'User not authorized'});
                }
                post.remove().then(() => res.json({success: true}));
            })
            .catch(err => res.status(404).json({nopostsfound: 'No posts found'}));
    });
});

/**
 * @route   Post api/post/like/:id
 * @desc    Like post
 * @access  private
 */
router.post("/like/:id", authCheck, (req,res) => {
    profileModel.findOne({user: req.user.id})
        .then(profile => {
            postModel.findById(req.params.id)
                .then(post => {
                    if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
                        return res.status(400).json({alreadyLiked: 'User already liked this post'});
                    }

                    // Add user id to likes array
                    post.likes.unshift({user: req.user.id});
                    post.save().then(post => res.json(post));
                })
                .catch(err => res.status(404).json(err));
        })
        .catch(err => res.status(404).json(err));
});

/**
 * @route   Post api/post/unlike/:id
 * @desc    Unlike post
 * @access  private
 */
router.post("/unlike/:id", authCheck, (req,res) => {
    profileModel.findOne({user: req.user.id})
        .then(profile => {
            postModel.findById(req.params.id)
                .then(post => {
                    if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
                        return res.status(400).json({notliked: 'You have not liked this post'});
                    }

                    // get remove index
                    const removeIndex = post.likes
                        .map(item => item.user.toString())
                        .indexOf(req.user.id);

                    // splice out of array
                    post.likes.splice(removeIndex, 1);

                    //save
                    post.save()
                        .then(post => {
                            res.json(post);
                            console.log(post);
                        })
                        .catch(err => res.status(404).json(err));
                })
                .catch(err => res.status(404).json(err));
        })
        .catch(err => res.status(404).json(err));
});

module.exports = router;