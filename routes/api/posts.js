const express = require('express');
const router = express.Router();
const passport = require('passport');


const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

const validatePostInput = require('../../validators/posts');

router.get('/test', (req, res) => {
  res.json({
    msg: "Posts work"
  })
})

// @route GET /api/posts/
// @desc  GET Posts
// @access Public
router.get('/', (req, res) => {
  Post.find().sort({
    date: -1
  }).then(posts => res.json(posts)).catch(err => res.status(404));
});


// @route GET /api/posts/:id
// @desc  GET Post by id
// @access Public
router.get('/:id', (req, res) => {
  Post.findById(
    req.params.id
  ).then(posts => res.json(posts)).catch(err => res.status(404).json({
    nopostfound: "No Post Found"
  }));
});

// @route POST /api/profile/
// @desc  POST Create Post
// @access Private

router.post('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  const {
    errors,
    isValid
  } = validatePostInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
  });
  newPost.save().then((post) => res.json({
    post
  })).catch((err) => res.status(400).json(err));
});


// @route DELETE /api/posts/:id
// @desc  DELETE Post 
// @access Public
router.delete('/:id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Profile.findOne({
    user: req.user.id
  }).then(profile => {
    Post.findById(req.params.id).then(post => {
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({
          noauthorize: " User not authorize"
        });
      }
      post.remove().then(() => {
        res.json({
          success: true
        });
      })
    }).catch(err => res.status(404).json({
      nopostfound: "No post found"
    }));
  });
});


// @route POST /api/posts/like/:id
// @desc  POST Like a Post
// @access Private

router.post('/like/:id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Profile.findOne({
    user: req.user.id
  }).then(profile => {
    Post.findById(req.params.id).then(post => {
      if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
        return res.status(400).json({
          alreadyliked: 'User already liked this post'
        });
      }
      // Add user to likes
      post.likes.unshift({
        user: req.user.id
      });

      post.save().then(post => res.json(post));

    }).catch(err => res.status(404).json({
      nopostfound: "No post found"
    }));
  });
});



// @route POST /api/posts/unlike/:id
// @desc  POST Like a Post
// @access Private

router.post('/unlike/:id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Profile.findOne({
    user: req.user.id
  }).then(profile => {
    Post.findById(req.params.id).then(post => {
      if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
        return res.status(400).json({
          notliked: 'You have not liked this post'
        });
      }
      //Get remove index
      const removeIndex = post.likes.map(item => item.user.toString())
        .indexOf(req.user.id);

      post.likes.splice(removeIndex, 1);

      post.save().then((post) => res.json(post));

    }).catch(err => res.status(404).json({
      nopostfound: "No post found"
    }));
  });
});

// @route POST /api/posts/comment/:id
// @desc  POST Comment a Post
// @access Private

router.post('/comment/:id', passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    const {
      errors,
      isValid
    } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          name: req.body.name,
          text: req.body.text,
          user: req.user.id,
          avatar: req.body.avatar,
        };

        post.comments.unshift(newComment);

        post.save().then(post => res.json(post));

      }).catch(err => res.status(404).json({
        postnotfound: "Post Not Found"
      }));
  }

);


// @route DELETE /api/posts/comment/:id/:comment_id
// @desc  POST Comment a Post
// @access Private

router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', {
    session: false
  }), (req, res) => {

    Post.findById(req.params.id)
      .then(post => {

        if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
          return res.status(404).json({
            commentnotexist: 'Comment does not exist'
          });
        }
        const removeIndex = post.comments.map(item => item.id).indexOf(req.params.comment_id);

        post.comments.splice(removeIndex, 1);

        post.save().then(post => res.json(post));

      }).catch(err => res.status(404).json({
        postnotfound: "Post Not Found"
      }));
  }

);
module.exports = router;