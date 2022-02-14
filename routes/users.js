const express = require("express");
const router = express.Router();
const {
 getRandNum,
 getUserName,
 getRandomDomain,
 formatePhoneNum,
 getRandThumbnail,
 getRandFirstName,
 getRandLastName,
 getRandAddress,
} = require("../utils");

router.get("/:length?", (req, res) => {
 const limit = 50;
 const param = Math.abs(parseInt(req.params.length)) >= limit ? limit : Math.abs(parseInt(req.params.length));
 const length = param || 1;

 const users = [];

 for (let index = 0; index < length; index++) {
  const firstName = getRandFirstName();
  const lastName = getRandLastName();
  const username = getUserName(firstName, lastName);
  const sex = Math.round(Math.random()) === 1 ? "female" : "male";
  const address = getRandAddress();
  const phone = Math.floor(getRandNum(1000000000, 9000000000));
  const thumbnail = getRandThumbnail(sex);

  users.push({
   id: index + 1,
   firstName,
   lastName,
   username: username,
   sex,
   thumbnail,
   age: getRandNum(21, 65),
   email: `${getUserName(firstName, lastName)}@${getRandomDomain()}.com`,
   address,
   phone,
   phoneFormatted: formatePhoneNum(phone),
   website: `www.${username.toLocaleLowerCase()}.com`,
  });
 }

 res.send({ status: 200, users });
});

module.exports = router;
