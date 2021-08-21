const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    date: {
      type: Date,
      default: Date.now,
    }
  }
);

const PostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    userName: {
      type: String,
      required: true
    },
    userCompany: {
      type: String,
    },
    userImage: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    upvotes: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
      ref: 'User',
    },
    date: {
      type: Date,
      default: Date.now,
    },
    comments: {
      type: [CommentSchema],
      default: [],
      required: false
    },
  }

);

module.exports = mongoose.model('Post', PostSchema);