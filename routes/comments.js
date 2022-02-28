const express = require("express");
const router = express.Router();
const { getRandCommentObj } = require("../utils");

router.get("/:length?", (req, res) => {
 const limit = 50;
 const param = Math.abs(parseInt(req.params.length)) >= limit ? limit : Math.abs(parseInt(req.params.length));
 const length = param || 1;

 const comments = [];

 for (let index = 0; index < length; index++) {
  comments.push(getRandCommentObj());
 }

 res.status(200).send({ status: 200, comments });
});

module.exports = router;
