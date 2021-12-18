const express = require('express');
const path = require('path');

const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post, Image, Category, User, ChatRoom } = require('../models');

const router = express.Router();

// Trade 요청. param으로 요청할 게시글을 받고, query로 어떤 게시글로 요청할지 id를 받자
router.post('/:postId', isLoggedIn, async(req, res, next) => {
  console.log('교환 요청 라우터 진입');
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.postId,
      }
    });
    const mypost = await Post.findOne({
      where: {
        id: req.query.mypostId,
      }
    });
    // 채팅방 생성
    const chatroom = await ChatRoom.create({
      title: post.title,
      BuyerId: req.user.id,
      SellerId: post.UserId,
      BuyerPostId: mypost?.id,
      SellerPostId: post.id,
    });
    const user = await User.findOne({
      where: {id: req.user.id},
    });
    const otherUser = await User.findOne({
      where: {id: post.UserId}
    });
    // await user.addChatRooms(chatroom);
    // await otherUser.addChatRooms(chatroom);
    await user.addChatRoomMembers(chatroom);
    await otherUser.addChatRoomMembers(chatroom);
    console.log(post);
    console.log(mypost);
    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    next(err);
  }
})


module.exports = router;