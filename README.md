# JSON Placeholder

Placeholder provides randomly generated JSON data for front-end developers to test their API or use it for showing quick demos or examples of fetch API. Requests can have multiple properties and queries to change what the API responds with.

[Link to the website](https://placeholder-api-dev.herokuapp.com/)

<br>

## Getting Started

You can clone this project for your personal use.

Open command prompt and type `git clone https://github.com/haydher/dev-api.git` to clone the app.

Then run `npm install` to install the dependencies

Run `node index.js` to run it on your `http://localhost:3000/`

You can fetch the following commands:

### /posts

Get one randomly generated JSON data of a post. Change how many posts you want in return by adding “/” and your number. For example, “/posts/5” to get an array of 5 posts. Max number is 50.

Posts can also return an array of comments if query is provided. You can request comments by add “?comments=X” to get the X number of comments. Max number is 20.

### /comments

Get one randomly generated JSON data of a comments. Change how many comments you want in return by adding “/” and your number. For example, “/comments/5” to get an array of 5 comments. Max number is 50.

### /users

Get one randomly generated JSON data of a user. Change how many posts you want in return by adding “/” and your number. For example, “/users/5” to get an array of 5 users. Max number is 50.

Users also include an object of address. The addresses are not related to the user and its randomly generated.

### /todos

Get one randomly generated JSON data of a post. Change how many todos you want in return by adding “/” and your number. For example, “/todos/5” to get an array of 5 todos. Max number is 50.

---

You can use fetch API to access the routes. For example,

```js
fetch("http://localhost:3000/posts/1?comments=2")
 .then((response) => response.json())
 .then((json) => console.log(json));
```
