const {
 firstNames,
 lastNames,
 postTitles,
 comments,
 womanThumbnails,
 manThumbnails,
 addresses,
 pictures,
} = require("./db");

// return random string based on whats given with min and max length
const getRandStr = async (str, minLength, maxLength) => {
 const string =
  str?.toString() ||
  `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt Neque porro quisquam est qui dolorem ipsum quia dolor sit amet consectetur adipisci velit sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem Ut enim ad minima veniam quis nostrum exercitationem ullam corporis suscipit laboriosam nisi ut aliquid ex ea commodi consequatur Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur vel illum qui dolorem eum fugiat quo voluptas nulla pariatur`;

 const min = parseInt(minLength) || 5;
 const max = parseInt(maxLength) || 10;
 0;
 // change string to array
 const strArr = string.split(" ");

 const randStrRange = getRandNum(min, max);

 const outputStr = [...Array(randStrRange)].map(() => strArr[Math.floor(Math.random() * strArr.length - 1)]).join(" ");

 return outputStr;
};

//
// get random domain name
const getRandomDomain = () => {
 const alphabets = [...Array(26)].map((val, i) => String.fromCharCode(i + 65).toLowerCase());
 return [...Array(getRandNum(3, 6))].map(() => alphabets[Math.floor(Math.random() * alphabets.length - 1)]).join("");
};

//
// get random number between range
const getRandNum = (minNum, maxNum) => {
 const min = parseInt(minNum) || 0;
 const max = parseInt(maxNum) || 30;

 // const randStrRange = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
 return Math.floor(Math.random() * (max - min + 1)) + min;
};

//
// get random user
const getRandUser = (index) => {
 const firstName = getRandFirstName();
 const lastName = getRandLastName();
 const username = getUserName(firstName, lastName);
 const sex = Math.round(Math.random()) === 1 ? "female" : "male";
 const address = getRandAddress();
 const phone = Math.floor(getRandNum(1000000000, 9000000000));
 const thumbnail = getRandThumbnail(sex);

 return {
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
  website: `www.${username.toLowerCase()}.com`,
 };
};

//
// returns random comments
const getRandCommentObj = () => {
 const commentUploadDate = getRandomDate(new Date(`09/08/2021`), new Date());
 return {
  comment: getRandComments(),
  upVotes: getRandNum(0, 200),
  downVotes: getRandNum(0, 100),
  username: getUserName(),
  thumbnail: getRandThumbnail(),
  commentDate: commentUploadDate.toLocaleDateString(),
  commentDateISO: commentUploadDate.toISOString(),
 };
};

//
// returns random posts
const getRandPosts = (index, commentsArr) => {
 const uploadDate = getRandomDate(new Date(`08/08/2021`), new Date());

 let postIndex = !index || !parseInt(index) || parseInt(index) <= 0 ? 0 : parseInt(index);

 return {
  id: postIndex + 1,
  username: getUserName(),
  thumbnail: getRandThumbnail(),
  pictures: getRandPostPic(),
  description: getRandDescription(),
  upVotes: getRandNum(0, 1000),
  downVotes: getRandNum(0, 500),
  uploadDate: uploadDate.toLocaleDateString(),
  uploadDateISO: uploadDate.toISOString(),
  comments: commentsArr,
 };
};

//
// returns an array of random pictures
const getRandPostPic = (arrLimit) => {
 const limit = parseInt(arrLimit) || getRandNum(1, 5);

 const imgsArr = [];
 for (let index = 0; index < limit; index++) {
  imgsArr.push(pictures[getRandNum(0, pictures.length - 1)]);
 }

 return imgsArr;
};

//
// returns a random date between today and a week from now
const getRandomDate = (dateStart, dateEnd, gap) => {
 // gap between two dates
 const dateGap = parseInt(gap) || 7;

 // get todays date
 const startDate = Object.prototype.toString.call(dateStart) === "[object Date]" ? dateStart : new Date();
 // get the date a week from now
 const endDate =
  Object.prototype.toString.call(dateEnd) === "[object Date]"
   ? dateEnd
   : new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + dateGap);

 return new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
};

//
// returns a random boolean
const getRandomBool = () => (Math.round(Math.random()) >= 1 ? true : false);

//
// return a random username based on first and last name
const getUserName = (fName, lName) => {
 const firstName = fName?.toString() || getRandFirstName();
 const lastName = lName?.toString() || getRandLastName();

 const usernames = [
  `${firstName}_${lastName}`,
  `${firstName}_${lastName}`,
  `${firstName[0]}${lastName}`,
  `${firstName}${lastName}`,
  `${firstName}${lastName[0]}`,
  `its_${firstName}${lastName}`,
  `its_${firstName}_${lastName}`,
  `its_${firstName}_${lastName}_official`,
  `${firstName}_${lastName}_official`,
 ];

 const randNum = getRandNum(0, usernames.length - 1);

 return usernames[randNum];
};

//
// get random first names
const getRandFirstName = (userFNameArr) =>
 firstNames[getRandNum(0, firstNames.length - 1)] ||
 (Array.isArray(userFNameArr) && userFNameArr[getRandNum(0, userFNameArr.length - 1)]);

//
// get random last names
const getRandLastName = (userLNameArr) =>
 lastNames[getRandNum(0, lastNames.length - 1)] ||
 (Array.isArray(userLNameArr) && userLNameArr[getRandNum(0, userLNameArr.length - 1)]);

//
// get random post description
// get random first names
const getRandDescription = (userDescArr) =>
 postTitles[getRandNum(0, postTitles.length - 1)] ||
 (Array.isArray(userDescArr) && userDescArr[getRandNum(0, userDescArr.length - 1)]);

//
// get random comments
// get random first names
const getRandComments = (userCommentArr) =>
 comments[getRandNum(0, comments.length - 1)] ||
 (Array.isArray(userCommentArr) && userCommentArr[getRandNum(0, userCommentArr.length - 1)]);

//
// get random address
const getRandAddress = (userAddArr) =>
 addresses[getRandNum(0, addresses.length - 1)] ||
 (Array.isArray(userAddArr) && userAddArr[getRandNum(0, userAddArr.length - 1)]);

//
// get random thumbnail/picture
const getRandThumbnail = (sex) => {
 const randSex = Math.round(Math.random()) === 1 ? "female" : "male" || sex.toString();
 return randSex === "female"
  ? womanThumbnails[getRandNum(0, womanThumbnails.length - 1)]
  : manThumbnails[getRandNum(0, manThumbnails.length - 1)];
};

//
// formate phone number
const formatePhoneNum = (phoneNumber) => {
 const cleaned = ("" + phoneNumber).replace(/\D/g, "");
 const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
 if (match) return "(" + match[1] + ") " + match[2] + "-" + match[3];
 return null;
};

module.exports = {
 getRandStr,
 getRandNum,
 getRandomDate,
 getRandomBool,
 getUserName,
 getRandomDomain,
 formatePhoneNum,
 getRandFirstName,
 getRandLastName,
 getRandDescription,
 getRandThumbnail,
 getRandComments,
 getRandAddress,
 getRandPosts,
 getRandCommentObj,
 getRandUser,
 getRandPostPic,
};
