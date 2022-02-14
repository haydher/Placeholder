const express = require("express");
const router = express.Router();
const { getRandNum, getUserName, getRandomDomain, formatePhoneNum } = require("../utils");
const { firstNames, lastNames, addresses, womanThumbnails, manThumbnails } = require("../db");

module.exports = router;
