exports.getRandStr = (str) => {
 const string =
  str?.toString() ||
  `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt Neque porro quisquam est qui dolorem ipsum quia dolor sit amet consectetur adipisci velit sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem Ut enim ad minima veniam quis nostrum exercitationem ullam corporis suscipit laboriosam nisi ut aliquid ex ea commodi consequatur Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur vel illum qui dolorem eum fugiat quo voluptas nulla pariatur`;

 // change string to array
 const strArr = string.split(" ");

 // const randStrRange = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
 const randStrRange = Math.floor(Math.random() * (20 - 5 + 1)) + 5;

 const outputStr = [...Array(randStrRange)].map(() => strArr[Math.floor(Math.random() * strArr.length)]).join(" ");

 return outputStr;
};

// returns a random date between today and a week from now
exports.getRandomDate = (dateStart, dateEnd) => {
 // get todays date
 const startDate = Object.prototype.toString.call(dateStart) === "[object Date]" || new Date();
 // get the date a week from now
 const endDate =
  Object.prototype.toString.call(dateEnd) === "[object Date]" ||
  new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 7);

 return new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
};

// returns a random boolean
exports.getRandomBool = () => (Math.round(Math.random()) >= 1 ? true : false);
