const express = require('express');
const { Chat } = require('../models');
const {Op} = require('sequelize');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');

const router = express.Router();

// 채팅 내역 불러오기
router.get('/:roomId',isLoggedIn, async (req, res, next) => {
  try {
    const chats = await Chat.findAll({
      where: {
        ChatRoomId: req.params.roomId, 
      }
    });
    res.status(200).json(chats);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 채팅 전송하기
router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    console.log('채팅을 db에 저장하겠습니다.');
    console.log(req.body.roomId, req.body.senderId, req.body.receiverId);
    const chat = await Chat.create({
      SenderId: req.body.senderId,
      ReceiverId: req.body.receiverId,
      ChatRoomId: req.body.roomId,
      content: req.body.content,
    });
    req.app.get('io').to(req.body.roomId).emit('chat', chat);
    res.status(200).json('ok');
  } catch (err) {
    console.error(err);
    next(err);
  }
})

module.exports = router;