const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('../middleware/isLoggedIn')
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth')

const Post = require('../models/Post')
//const Comment = require('../models/Comment')


// @desc    Show all posts
// @route   GET /posts
// @access  Public
router.get('/', isLoggedIn, async (req, res) => {
  try {
    const posts = await Post.find({}).sort({
      date: -1,
    });
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).send(err)
  }
})

// @desc    Show single post
// @route   GET /posts/:id
// @access  Public
/* router.get('/:id', isLoggedIn, (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(post)
    }
  })
}) */

// @desc    Process add form
// @route   POST /posts/
// @access  Private
router.post('/', [isLoggedIn,
  [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Content is required').not().isEmpty(),
  ]
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { title, description } = req.body;
  console.log(req.body);
  try {
    const newpost = {
      title,
      description,
      user: req.user.id,
      userName: req.user.fullName,
      userCompany: req.user.company,
      userImage: req.user.profilePic

    };
    const newPost = await Post.create(newpost);
    res.status(201).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(500).send(err)
  }
})

// @route     PUT api/posts/:id
// @desc      Update post
// @access    Private
router.put('/:id', auth, async (req, res) => {
  const { title, description } = req.body
  const postFields = {};
  if (title) {
    postFields.title = title;
  }
  if (description) {
    postFields.description = description;
  }
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not allowed to edit this post' })
    }
    post = Post.findByIdAndUpdate(req.params.id, { $set: postFields }, { new: true });
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).send(err)
  }
})

router.put('/:id/upvote', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    var flag = true;
    post.upvotes.foreach(function (upvote) {
      if (upvote.toString() === req.user._id.toString()) {
        upvotes.splice(upvotes.indexOf(upvote), 1);
        flag = false;
      }
    })
    if (flag) {
      post.upvotes.push(req.user._id);
    }
    post = await Post.findByIdAndUpdate(req.params.id, { $set: { upvotes: post.upvotes } }, { new: true });
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).send(err)
  }
})


// @route     DELETE api/posts/:id
// @desc      Delete post
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not allowed to delete this post' })
    }
    post = Post.findByIdAndRemove(req.params.id);
    res.status(200).json({ msg: 'Post deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).send(err)
  }
});


router.get('/:id/comments', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    const comments = post.comments;
    if (comments) {
      res.status(200).json(comments);
    }
    else {
      res.status(200).json({ message: 'No comments found' })
    }
    //res.status(200).json(comments);
  } catch (err) {
    console.log(err);
    res.status(500).send(err)
  }
});


router.post('/:id/comments',
  [
    auth,
    [
      check('comment', 'Comment is required').not().isEmpty(),
    ]
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { comment } = req.body;
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' })
      }
      const newcomment = {
        comment,
        user: req.user._id,
      };
      const newComments = await Post.findById(req.params.id).comments.push(newcomment);
      post = Post.findByIdAndUpdate(req.params.id, { $set: { comments: newComment } }, { new: true });
      res.status(201).json(post);
    } catch (err) {
      console.log(err);
      res.status(500).send(err)
    }
  });

router.delete('/:id/comments/:commentId', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    const comment = post.comments.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' })
    }
    if ((comment.user.toString() !== req.user._id.toString()) || (post.user.toString() !== req.user._id.toString())) {
      return res.status(403).json({ message: 'You are not allowed to delete this comment' })
    }
    post = await Post.findByIdAndUpdate(req.params.id, { $pull: { comments: { _id: req.params.commentId } } }, { new: true });
    res.status(200).json({ msg: 'Comment deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).send(err)
  }
});

module.exports = router;
