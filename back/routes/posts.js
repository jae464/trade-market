const express = require('express');
const {Op} = require('sequelize');
const { Post, Image, User } = require('../models');
const router = express.Router();

// 전체 게시글 불러오기
router.get('/', async (req, res, next) => { // GET /posts
  try {
    const posts = await Post.findAll({
      limit: 10,
      order: [
        ['createdAt', 'DESC']
      ],
      include: [
        {
          model: Image,
        },
        {
          model: User,
          attributes: ['id','location'],
        }
      ]
    });
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;