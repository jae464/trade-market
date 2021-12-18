const express = require('express');
const { ChatRoom, Post, Image, User } = require('../models');
const {Op} = require('sequelize');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');

const router = express.Router();

// 모든 채팅방 목록 불러오기
router.get('/',isLoggedIn, async (req, res, next) => {
  console.log('채팅방 불러오는 라우터');
  
  try {
    const user = await User.findOne({
      where: {id: req.user.id},
    });
    const chatrooms = await user.getChatRoomMembers({
      order: [
        ['createdAt','DESC']
      ],
      include: [
        {
          model: Post,
          as: 'BuyerPost',
          include: [
            {
              model: Image,
            }
          ]
        },
        {
          model: Post,
          as: 'SellerPost',
          include: [
            {
              model: Image,
            }
          ]
        },
        {
          model: User,
          as: 'Buyer',
          attributes: ['id','nickname'],
        },
        {
          model: User,
          as: 'Seller',
          attributes: ['id', 'nickname'],
        }
      ]
    });

    console.log(chatrooms);
    res.status(200).json(chatrooms);
  } catch (err) {
    console.error(err);
    next(err);
  }
})

// 방 나가기
router.patch('/:roomId', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {id: req.user.id},
    });
    console.log(req.params.roomId);
    const result = await user.removeChatRoomMembers(req.params.roomId);
    console.log(result);
    res.json('방에서 나갔습니다.');
  } catch (err) {
    console.error(err);
    next(err);
  }
})

// 해당 채팅방에 상대방이 참여하고 있는지 확인
router.get('/:roomId/:userId', async (req, res, next) => {
  try {
    const room = await ChatRoom.findOne({
      where: {id: req.params.roomId},
    });
    const member = await room.getChatRoomMembers({
      where: {
        id: req.params.userId
      },
      attributes: ['id'],
    });

    console.log('상대 유저의 참여 여부 : ',member);
    if(member.length === 0) {
      res.status(201).json(false);
    } else {
      res.status(201).json(true);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
})
module.exports = router;