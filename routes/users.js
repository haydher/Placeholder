const express = require("express");
const router = express.Router();
const { getRandUser } = require("../utils");

router.get("/:length?", (req, res) => {
 const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || req.socket.localAddress || req.ip;
 //  ip.replace(/^.*:/, "");

 const limit = 50;
 const param = Math.abs(parseInt(req.params.length)) >= limit ? limit : Math.abs(parseInt(req.params.length));
 const length = param || 1;

 const users = [];

 for (let index = 0; index < length; index++) {
  users.push(getRandUser(index));
 }

 res.status(200).send({ status: 200, users });
});

module.exports = router;
