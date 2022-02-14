const express = require("express");
const router = express.Router();
const {
 getUserName,
 getRandDescription,
 getRandThumbnail,
 getRandComments,
 getRandNum,
 getRandomDate,
} = require("../utils");

router.get("/:length?", (req, res) => {
 // for  params
 const limit = 50;
 const param = Math.abs(parseInt(req.params.length)) >= limit ? limit : Math.abs(parseInt(req.params.length));
 const length = param || 1;

 // for query
 const commentsLimit = 15;
 const query =
  Math.abs(parseInt(req.query.comments)) >= commentsLimit ? commentsLimit : Math.abs(parseInt(req.query.comments));
 const commentQuery = query || 0;

 // final posts go here
 const posts = [];

 for (let index = 0; index < length; index++) {
  // all the comments go here
  let commentsArr = [];

  // if there is a query for comments then add comments as well. limit is 15 per post
  if (commentQuery > 0)
   for (let j = 0; j < commentQuery; j++) {
    commentsArr.push({
     comment: getRandComments(),
     upVotes: getRandNum(0, 200),
     downVotes: getRandNum(0, 100),
     username: getUserName(),
     thumbnail: getRandThumbnail(),
     commentDate: getRandomDate().toLocaleDateString(),
     commentDateISO: getRandomDate().toISOString(),
    });
   }

  posts.push({
   id: index + 1,
   username: getUserName(),
   thumbnail: getRandThumbnail(),
   pictures: [getRandThumbnail(), getRandThumbnail(), getRandThumbnail(), getRandThumbnail(), getRandThumbnail()],
   description: getRandDescription(),
   upVotes: getRandNum(0, 1000),
   downVotes: getRandNum(0, 500),
   uploadDate: getRandomDate().toLocaleDateString(),
   uploadDateISO: getRandomDate().toISOString(),
   comments: commentsArr,
  });
 }

 res.send({ status: 200, posts });
});

module.exports = router;
