const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const {User} = require('../models');
const router = express.Router();

// 회원가입
router.post('/', isNotLoggedIn, async (req, res, next) => { // POST /user/
  try {
    console.log('흠터레스팅');
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res.status(403).send('이미 사용중인 아이디입니다.');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    console.log('여기까진 왔나?');
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
      location: req.body.location,
    });
    res.status(201).send('회원가입 성공');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 로그인
router.post('/login', isNotLoggedIn, async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if(err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if(loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      res.setHeader('Cookie', 'cxlhy');
      const fullUserWithourPassword = await User.findOne({
        where: {id: user.id},
        attributes: {
          exclude: ['password'],
        }
      });
      return res.status(200).json(fullUserWithourPassword);
    });
  })(req, res, next);
});
module.exports = router;