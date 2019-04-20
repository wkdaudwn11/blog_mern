const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

// Load User Model
const userModel = require('../../models/userModel');

/**
 * @route   GET api/user/test
 * @desc    Tests user route
 * @access  Public
 */
router.get('/test', (req, res) => res.json({msg: 'userRouter Works'}));

/**
 * @route   POST api/user/register
 * @desc    Register user
 * @access  Public
 */
/* 기본구조
router.post('/register', (req, res) => {
    userModel
        .findOne({email: req.body.email})
        .then()
        .catch()
});
*/
router.post('/register', (req, res) => {
    userModel
        .findOne({email: req.body.email})
        .then(user => {
            if(user){
                return res.status(400).json({
                    msg: 'Email already exists'
                });
            }else{
                // Create avatar
                // http://www.gravatar.com/avatar/56a0311c22d8e7b6d152ca6b90aa2e46?s=200&r=pg&d=mm 대충 이런식으로 주소가 만들어짐.
                // 위의 주소가 DB에 들어감
                const avatar = gravatar.url(req.body.email, {
                    s: '200',   // size
                    r: 'pg',    // Rating
                    d: 'mm'     // Default
                });
                
                // Create User
                const newUser = new userModel({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                });

                // 암호화
                bcrypt.genSalt(10, (err, salt) => {
                    // bcrypt.hash(newUser.password, null, null, function(err, hash) {  <- 이렇게도 가능한 거 같음.
                    // https://jungwoon.github.io/node.js/2017/08/07/bcrypt-nodejs/ <- 참고
                    bcrypt.hash(newUser.password, salt, (err, hash) => { // 암호화 할 대상, salt, (err, hash)
                        if(err) throw err; // 암호화 실패하면 에러던짐
                        newUser.password = hash; // 성공하면 비밀번호에 해쉬값 넣음
                        newUser.save() // 저장
                            .then(user => res.json(user))
                            .catch(err => res.json(err));
                    });

                    /**
                    // 일반문자 : 해싱값 비교. (로그인 할 때 이렇게 쓰면 될 거 같음)
                    bcrypt.compare("keyword", hash, function(err, res) {
                        // "keyword"와 hash(해싱된 코드)를 비교하여 같으면 true 아니면 false를 반환합니다
                    });
                     */

                });
            }
        })
        .catch(err => res.json(err))
});

module.exports = router;