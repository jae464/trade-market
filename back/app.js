const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const morgan = require('morgan');
const path = require('path');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const tradeRouter = require('./routes/trade');
const chatroomRouter = require('./routes/chatroom');
const chatRouter = require('./routes/chat');
const passportConfig = require('./passport');
const webSocket = require('./socket');

const db = require('./models');

dotenv.config();
const app = express();

db.sequelize.sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);

passportConfig();
app.use(morgan('dev'));
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/trade', tradeRouter);
app.use('/chatroom', chatroomRouter);
app.use('/chat', chatRouter);
const server = app.listen(3070, () => {
  console.log('서버 실행중');
});

webSocket(server, app);
