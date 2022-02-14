const express = require("express");
const picture = require("./routes/picture");
const todos = require("./routes/todos");
const users = require("./routes/users");
const posts = require("./routes/posts");

require("dotenv").config();

const app = express();

app.use("/photo", picture);
app.use("/todos", todos);
app.use("/users", users);
app.use("/posts", posts);

app.get("/", (req, res) => {
 res.send("Hello World");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`connected to the port ${port}`));

/*

// done
routes to random pictures
   number of pictures
   specific picture
   picture size 
       
// done
routes to to-do list
   things to do
   title
   description
   done or not
   date to do
   date done

// done
routes to random users
   full name
   username
   picture
   email
   address
   phone
   website


routes to user posts
   number of likes/upvotes
   number of dislikes/downvotes
   multiple pictures for post
   comments 
   likes on comments 
   description 
   date of upload 

   
routes to e-commerce
   name of product
   description
   price
   type
      hoodie
      joggers
      jackets
      shirts
      tank tops
      bikini
      shoes
      kids
   available sizes
   available inventory
   user rating
   color

*/
