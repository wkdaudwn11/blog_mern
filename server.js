const express = require('express');
const mongoose = require('mongoose');

/** routing 경로 */
const userRouter = require('./routes/api/userRouter');
const profileRouter = require('./routes/api/profileRouter');
const postRouter = require('./routes/api/postRouter');

const app = express();

app.get('/', (req, res) => res.send('Hello World'));

/** use route */
app.use('/api/user', userRouter);
app.use('/api/profile', profileRouter);
app.use('/api/post', postRouter);

/** port */
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}...`));