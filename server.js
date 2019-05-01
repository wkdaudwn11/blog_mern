const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // 이거해야 request.body... 이거 쓸 수 있음
const passport = require('passport'); // passport 설정

/** routing 경로 */
const userRouter = require('./routes/api/userRouter');
const profileRouter = require('./routes/api/profileRouter');
const postRouter = require('./routes/api/postRouter');

const app = express();

/**
 * @bodyParser  mongoose
 * @desc        body-parser setting
 * @access      Public
 */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/**
 * @database    mongoose
 * @desc        blog_mern Study
 * @access      Public
 */
const db = require('./config/keys').mongoURI;
mongoose.Promise = global.Promise; //  안해도 상관없는데 에러나서 걍 추가함
mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

/**
 * @route   GET /
 * @desc    Tests post route
 * @access  Public
 */
app.get('/', (req, res) => res.send('Hello World'));

// passport middlewears
app.use(passport.initialize()); // passport 초기화

// passport config mapping
require('./config/passport')(passport);

/** use route */
app.use('/api/user', userRouter);
app.use('/api/profile', profileRouter);
app.use('/api/post', postRouter);

/** port */
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}...`));