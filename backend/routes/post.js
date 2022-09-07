const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/post');
const commentCtrl = require('../controllers/comment');

router.get('/', auth, postCtrl.getAllPost);
router.post('/', auth, multer, postCtrl.createPost);
router.get('/:id', auth, postCtrl.getOnePost);
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);
router.post('/:id/like', auth, postCtrl.likeAndDislike)

router.post('/:id/comment', auth, multer, commentCtrl.createComment)
router.put('/:id/comment', auth, multer, commentCtrl.modifyComment)
router.get('/:id/comment', auth, commentCtrl.getComment)
router.delete('/:id/comment', auth, commentCtrl.deleteComment)
router.post('/:id/comment/like', auth, commentCtrl.likeAndDislike)


module.exports = router;