const express = require("express");
const router = express.Router();
const { getRandPosts, getRandCommentObj } = require("../utils");

router.get("/:length?", (req, res) => {
 // for  params
 const limit = 50;
 const param = Math.abs(parseInt(req.params.length)) >= limit ? limit : Math.abs(parseInt(req.params.length));
 const length = param || 1;

 // for query
 const commentsLimit = 10;
 const query =
  Math.abs(parseInt(req.query.comments)) >= commentsLimit ? commentsLimit : Math.abs(parseInt(req.query.comments));
 const commentLength = query || 0;

 // final posts go here
 const posts = [];

 // all the comments go here
 let commentsArr = [];

 // if there is a query for comments then add comments as well. limit is 15 per post
 if (commentLength > 0)
  for (let j = 0; j < commentLength; j++) {
   commentsArr.push(getRandCommentObj());
  }

 // populate posts
 for (let index = 0; index < length; index++) {
  posts.push(getRandPosts(index, commentsArr));
 }

 res.status(200).send({ status: 200, posts });
});

module.exports = router;
