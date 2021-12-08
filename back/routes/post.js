const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const {Post, Image, Category, User} = require('../models');

const router = express.Router();

try {
  fs.accessSync("uploads");
} catch (error) {
  console.log("uploads 폴더가 없으므로 생성합니다.");
  fs.mkdirSync("uploads");
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      done(null, basename + '_' + new Date().getTime() + ext);
    },
  }),
  limits: {fileSize: 20 * 1024 * 1024 },  // 20MB 제한
})

// 게시글 업로드
router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {  // POST /post
  console.log('게시글업로드부분', req.body);
  try {
    // const post = await Post.create({
    //   UserId: req.user.id,
    //   title: req.body.title,
    //   content: req.body.content,
    //   price: req.body.price,
    //   // category: req.body.category,
    //   trade: req.body.trade,
    // });
    const category = await Category.findOrCreate({
      where: {category: req.body.category}
    });
    console.log(category[0].id);
    const post = await Post.create({
      UserId: req.user.id,
      title: req.body.title,
      content: req.body.content,
      price: req.body.price,
      // category: req.body.category,
      trade: req.body.trade,
      CategoryId: category[0].id,
    });
    // console.log(category);
    // await post.addCategory(category);
    if(req.body.image) {
      if(Array.isArray(req.body.image)) {
        const images = await Promise.all(
          req.body.image.map((image) => Image.create({src: image}))
        );
        await post.addImages(images);
      } else {
        const image = await Image.create({src: req.body.image});
        await post.addImages(image);
      }
    }
    if(req.body.wantCategory) {
      if(Array.isArray(req.body.wantCategory)) {
        console.log('포스트 출력하기',post);
        // 이 부분 문제임... 잘 생각해보고 다시 해보자
        // 원하는 카테고리 백엔드에 추가 (해결!!)
        const wantCategories = await Promise.all(
          req.body.wantCategory.map((category) => 
            Category.findOrCreate({
              where: {category: category},
            })
          )
        );
        console.log('wantCategories', wantCategories);
        await post.addWantCategorys(wantCategories.map((v) => v[0]));
        // await post.addWantCategory(wantCategories);
      } else {
        const wantCategory = await Category.findOrCreate({
          where: {category: req.body.wantCategory}
        });
        await post.addWantCategorys(wantCategory[0]);
        // console.log('포스트 출력하기', post);
        // const wantCategory = await post.addWantCategorys(category);
        // await post.addWantCategory(wantCategory);
      }
    }
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 이미지 업로드
router.post('/images', isLoggedIn, upload.array('image'), (req, res, next) => { // Post /post/images
  console.log('이미지 업로드 라우터');
  res.json(req.files.map((v) => v.filename));
});

// 게시글 불러오기
router.get('/:postId', async (req, res, next) => { // GET /post
  console.log(`${req.params.postId} 를 불러옵니다...`);
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.postId,
      },
      include: [
        {
          model: Image,
        },
        {
          model: Category,
          as: 'WantCategorys'
        },
        {
          model: User,
          attributes: ['location'],
        }
      ]
    })
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    next(err);
  }
})

// 게시글 삭제
router.delete('/:postId',isLoggedIn, async (req, res, next) => { // DELETE /post
  try {
    console.log(req.params.postId,'삭제 시도할게요');
    await Post.destroy({
      where: {
        id: req.params.postId,
        UserId: req.user.id,
      }
    });
    res.status(200).json({PostId: parseInt(req.params.postId, 10)});
  } catch(err) {
    console.error(err);
    next(err);
  }
})
module.exports = router;