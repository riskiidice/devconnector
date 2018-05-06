const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostShema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  likes: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  }],
  comments: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    name: {
      type: String
    },
    avatar: {
      type: String
    },
    text: {
      type: String
    },
    date: {
      type: Date,
      defaule: Date.now
    }
  }]
});

module.exports = Post = mongoose.model('post', PostShema);