const express = require("express");
const router = express.Router();
const { getRandNum, getUserName, getRandomDomain, formatePhoneNum } = require("../utils");
const { firstNames, lastNames, postTitles, comments, womanThumbnails, manThumbnails } = require("../db");

// number of likes/upvotes
// number of dislikes/downvotes
// multiple pictures for post
// comments
// likes on comments
// description
// date of upload


const obj = {
 id: 0,
 pictures: ["", "",],
 description: "",
 upVotes: 0,
 downVotes: 0,
 uploadDate: "",
 uploadDateISO: "",
 comments: [
  {
   comment: "",
   upVotes: 0,
   downVotes: 0,
   username: "",
   thumbnail: "",
   date: "",
   dateISO: "",
  }
 ]
}

// 
// 
// 
// 
// 
// 
//  finish this part, add posts, comments etc
// 
// 
// 
// 
// 
// 
// 
// 


router.get("/:length?", (req, res) => {

 const limit = 50;
 const param = Math.abs(parseInt(req.params.length)) >= limit ? limit : Math.abs(parseInt(req.params.length));
 const length = param || 1;

 const posts = [];

 for (let index = 0; index < length; index++) {
  const firstName = firstNames[getRandNum(0, firstNames.length - 1)];
  const lastName = lastNames[getRandNum(0, lastNames.length - 1)];
  const username = getUserName(firstName, lastName);
  const sex = Math.round(Math.random()) === 1 ? "female" : "male";
  const address = addresses[getRandNum(0, addresses.length - 1)];
  const phone = Math.floor(getRandNum(1000000000, 9000000000));
  const thumbnail =
   sex === "female"
    ? womanThumbnails[getRandNum(0, womanThumbnails.length - 1)]
    : manThumbnails[getRandNum(0, manThumbnails.length - 1)];
  const description = postTitles[getRandNum(0, postTitles.length - 1)]


  for(let j = 0; j <= 10; 1)
  let comment = {
   comment: comments[getRandNum(0, comments.length - 1)],
   upVotes: 0,
   downVotes: 0,
   username: "",
   thumbnail: "",
   date: "",
   dateISO: "",
  };


  posts.push({
   id: index + 1,
   username: username,
   thumbnail,

   pictures: ["", "",],
   description,
   upVotes: 0,
   downVotes: 0,
   uploadDate: "",
   uploadDateISO: "",
   comments: [
    {
     comment: comments[getRandNum(0, comments.length - 1)],
     upVotes: 0,
     downVotes: 0,
     username: "",
     thumbnail: "",
     date: "",
     dateISO: "",
    }
   ]
  });
 }

 res.send({ status: 200, posts });

});
module.exports = router;
