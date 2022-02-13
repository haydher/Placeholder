const express = require("express");
const picture = require("./routes/picture");
require("dotenv").config();

const app = express();

app.use("/api", picture);

app.get("/", (req, res) => {
 res.send("Hello World");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`connected to the port ${port}`));

/*

routes to random pictures
   number of pictures
   specific picture
   picture size 
    
routes to user posts
   number of likes/upvotes
   number of dislikes/downvotes
   multiple pictures for post
   comments 
   likes on comments 
   description 
   date of upload 
   
routes to to-do list
   things to do
   title
   description
   done or not
   date to do
   date done
   
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
   
routes to user posts
   number of likes/upvotes

*/
