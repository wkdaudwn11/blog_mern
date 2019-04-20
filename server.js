const express = require('express');
const mongoose = require('mongoose');

/** routing 경로 */
const userRouter = require('./routes/api/userRouter');
const profileRouter = require('./routes/api/profileRouter');
const postRouter = require('./routes/api/postRouter');

const app = express();

/**
 * @database    mongoose
 * @desc        blog_mern Study
 * @access      Public
 */
const db = require('./config/keys').mongoURI;
mongoose.Promise = global.Promise; //  안해도 상관없는데 에러나서 걍 추가함
mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true})
    .then(() => console.log('MongoDb Connected...'))
    .catch(err => console.log(err));

/**
 * @route   GET /
 * @desc    Tests post route
 * @access  Public
 */
app.get('/', (req, res) => res.send('Hello World'));

/** use route */
app.use('/api/user', userRouter);
app.use('/api/profile', profileRouter);
app.use('/api/post', postRouter);

/** port */
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}...`));