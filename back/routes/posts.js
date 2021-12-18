const express = require('express');
const {Op} = require('sequelize');
const { Post, Image, User } = require('../models');
const router = express.Router();

// 전체 게시글 불러오기
router.get('/', async (req, res, next) => { // GET /posts
  try {
    const posts = await Post.findAll({
      limit: 100,
      order: [
        ['createdAt', 'DESC']
      ],
      include: [
        {
          model: Image,
        },
        {
          model: User,
          attributes: ['id','location','nickname'],
        }
      ]
    });
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 게시글 검색 결과 불러오기
router.get('/search/:searchWord', async (req, res, next) => { // GET /posts/search/searchWord
  try {
    const posts = await Post.findAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: "%" + req.params.searchWord + "%",
            }
          },
          {
            content: {
              [Op.like]: "%" + req.params.searchWord + "%",
            }
          },
        ]
      },
      order: [
        ['createdAt', 'DESC']
      ],
      include: [
        {
          model: Image,
        },
        {
          model: User,
          attributes: ['id','location','nickname'],
        }
      ]
    });
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
})
// 나의 게시글 불러오기
router.get('/:userId', async(req,res,next) => { // GET /posts/userId
  try {
    const posts = await Post.findAll({
      where: {
        UserId: req.user.id,
      },
      order: [
        ['createdAt', 'DESC']
      ],
      include: [
        {
          model: Image,
        },
        {
          model: User,
          attributes: ['id', 'location']
        }
      ]
    });
    // console.log(posts);
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
})
module.exports = router;