const posts = document.querySelector("#posts");
const comments = document.querySelector("#comments");
const users = document.querySelector("#users");
const todos = document.querySelector("#todos");

const hostURL = `${window.location.protocol}//${window.location.hostname}`;
// const hostURL = `https://placeholder-api-dev.herokuapp.com`;

const fetchData = [
 {
  url: `${hostURL}/posts/1?comments=2`,
  message: "// Get randomly generated users with actual data",
  domElement: posts,
 },
 {
  url: `${hostURL}/users/2`,
  message: "// Get randomly generated users with actual data",
  domElement: users,
 },
 {
  url: `${hostURL}/todos/2`,
  message: "// Get randomly generated users with actual data",
  domElement: todos,
 },
 {
  url: `${hostURL}/comments/2`,
  message: "// Get randomly generated users with actual data",
  domElement: comments,
 },
];

fetchData.map((obj) => {
 fetch(obj.url)
  .then((response) => response.json())
  .then((json) => updateCard(json, obj))
  .catch((err) => {
   console.log(err);
  });
});

// update the cards where fetch data shows
const updateCard = (json, obj) => {
 const parentElement = obj.domElement.parentElement;
 const copyCode = parentElement.querySelector(".copyCode .svgContainer");
 const codeDescription = parentElement.querySelector(".description");
 const fetchCode = parentElement.querySelector(".code");

 codeDescription.textContent = obj.message;

 // update the code for copying the fetch url
 fetchCode.innerHTML = `
  <span class="primaryCode">fetch</span>(<span class="link"
  >'${obj.url}'</span
  >) <br />
  <span class="codeDot">.</span><span class="primaryCode">then</span>(response => response<span class="codeDot"
    >.</span
  ><span class="primaryCode">json</span>())<br />
  <span class="codeDot">.</span><span class="primaryCode">then</span>(json => console<span class="codeDot">.</span
  ><span class="primaryCode">log</span>(json))
  `;

 // add event listener to copy code
 copyCode.addEventListener("click", () =>
  navigator.clipboard.writeText(`
    fetch('${obj.url}')
    .then(response => response.json())
    .then(json => console.log(json))`)
 );

 // update the json
 const newPre = document.createElement("pre");
 newPre.innerHTML = syntaxHighlight(JSON.stringify(json, undefined, 4));

 obj.domElement.appendChild(newPre);
};

// color code and formate the output json
const syntaxHighlight = (json) => {
 json = json.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

 const regex = /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g;

 return json.replace(regex, (match) => {
  let className = "number";
  if (/^"/.test(match)) {
   if (/:$/.test(match)) className = "key";
   else className = "string";
  } else if (/true|false/.test(match)) className = "boolean";
  else if (/null/.test(match)) className = "null";
  return `<span class="${className}">${match}</span>`;
 });
};

// slide the carousel
const cards = document.querySelectorAll(".card");
const slideLeftBtn = document.querySelector(".leftSlider");
const slideRightBtn = document.querySelector(".rightSlider");

// pixels to transform the slide
let transformWidth = 0;
// transform less than the slides length
let cardsIncrement = 1;

// get the dimensions of the card
const cardStyle = cards[0].currentStyle || window.getComputedStyle(cards[0]);
const cardWidth = parseInt(cardStyle.width);
const cardMargin = parseInt(cardStyle.marginRight);

[slideLeftBtn, slideRightBtn].forEach((btn, index) => {
 btn.addEventListener("click", () => {
  // left button
  if (index === 0 && transformWidth > 0) {
   transformWidth -= cardWidth + cardMargin + cardMargin;
   cardsIncrement--;
  }
  // right button
  if (index === 1 && cardsIncrement < cards.length) {
   transformWidth += cardWidth + cardMargin + cardMargin;
   cardsIncrement++;
  }

  // apply the property to each of the card
  cards.forEach((card) => {
   card.style.transform = `translateX(-${transformWidth}px)`;
   card.style.transition = `transform .2s ease`;
  });
  toggleSliderBtn();
 });
});

// hide slider btns if slide is on the first and last card
toggleSliderBtn();
function toggleSliderBtn() {
 if (cardsIncrement <= 1) slideLeftBtn.style.visibility = "hidden";
 if (cardsIncrement > 1) slideLeftBtn.style.visibility = "visible";
 if (cardsIncrement === cards.length) slideRightBtn.style.visibility = "hidden";
 if (cardsIncrement < cards.length) slideRightBtn.style.visibility = "visible";
}

// align the slider buttons relative to the card so the buttons are aligned centered of two cards
getSliderDistance();
function getSliderDistance() {
 const cardStyle = cards[0].currentStyle || window.getComputedStyle(cards[0]);
 const cardWidth = parseInt(cardStyle.width);
 const cardMargin = parseInt(cardStyle.marginRight);

 const distanceLeft = cards[0].offsetLeft - cardMargin - slideLeftBtn.offsetWidth / 2;
 const distanceRight = cards[0].offsetLeft + cardWidth + cardMargin - slideLeftBtn.offsetWidth / 2;
 slideLeftBtn.style.left = `${distanceLeft}px`;
 slideRightBtn.style.left = `${distanceRight}px`;
}
window.addEventListener("resize", getSliderDistance);
