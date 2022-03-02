const posts = document.querySelector("#posts");
const comments = document.querySelector("#comments");
const users = document.querySelector("#users");
const todos = document.querySelector("#todos");

// const hostURL = `${window.location.protocol}//${window.location.hostname}`;
const hostURL = `https://placeholder-api-dev.herokuapp.com`;

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
  .catch((err) => console.log(err));
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
const toggleSliderBtn = () => {
 if (cardsIncrement <= 1) slideLeftBtn.style.visibility = "hidden";
 if (cardsIncrement > 1) slideLeftBtn.style.visibility = "visible";
 if (cardsIncrement === cards.length) slideRightBtn.style.visibility = "hidden";
 if (cardsIncrement < cards.length) slideRightBtn.style.visibility = "visible";
};
toggleSliderBtn();

// align the slider buttons relative to the card so the buttons are aligned centered of two cards
const getSliderDistance = () => {
 const cardStyle = cards[0].currentStyle || window.getComputedStyle(cards[0]);
 const cardWidth = parseInt(cardStyle.width);
 const cardMargin = parseInt(cardStyle.marginRight);

 const distanceLeft = cards[0].offsetLeft - cardMargin - slideLeftBtn.offsetWidth / 2;
 const distanceRight = cards[0].offsetLeft + cardWidth + cardMargin - slideLeftBtn.offsetWidth / 2;
 slideLeftBtn.style.left = `${distanceLeft}px`;
 slideRightBtn.style.left = `${distanceRight}px`;
};
window.addEventListener("resize", getSliderDistance);
getSliderDistance();

/*

const carousel = document.querySelector(".carousel");

const makeCard = (desc, url, json) => {
 const cardDiv = document.createElement("div");
 const cardHeaderDiv = document.createElement("div");
 const headerCodeDiv = document.createElement("div");
 const descriptionP = document.createElement("p");
 const codeP = document.createElement("p");
 const copyCodeDiv = document.createElement("div");
 const outPutDiv = document.createElement("div");

 cardDiv.classList.add("card");
 cardHeaderDiv.classList.add("cardHeader");
 headerCodeDiv.classList.add("headerCode");
 descriptionP.classList.add("description");
 codeP.classList.add("code");
 copyCodeDiv.classList.add("copyCode");
 outPutDiv.classList.add("fetchOutput");

 descriptionP.innerHTML = desc;

 codeP.innerHTML = `
 <span class="primaryCode">fetch</span>(<span class="link"
 >'${url}'</span
 >) <br />
 <span class="codeDot">.</span><span class="primaryCode">then</span>(response => response<span class="codeDot"
  >.</span
 ><span class="primaryCode">json</span>())<br />
 <span class="codeDot">.</span><span class="primaryCode">then</span>(json => console<span class="codeDot">.</span
 ><span class="primaryCode">log</span>(json))
`;

 headerCodeDiv.appendChild(descriptionP);
 headerCodeDiv.appendChild(codeP);

 copyCodeDiv.innerHTML = `
  <div class="svgContainer">
   <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 4.16667H18C18.5304 4.16667 19.0391 4.38616 19.4142 4.77686C19.7893 5.16756 20 5.69747 20 6.25V20.8333C20 21.3859 19.7893 21.9158 19.4142 22.3065C19.0391 22.6972 18.5304 22.9167 18 22.9167H6C5.46957 22.9167 4.96086 22.6972 4.58579 22.3065C4.21071 21.9158 4 21.3859 4 20.8333V6.25C4 5.69747 4.21071 5.16756 4.58579 4.77686C4.96086 4.38616 5.46957 4.16667 6 4.16667H8" stroke="#F9F9F9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M15 2.08333H9C8.44772 2.08333 8 2.5497 8 3.125V5.20833C8 5.78363 8.44772 6.25 9 6.25H15C15.5523 6.25 16 5.78363 16 5.20833V3.125C16 2.5497 15.5523 2.08333 15 2.08333Z" stroke="#F9F9F9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
   </svg>
  </div>
 `;

 //copy fetch code to clipboard
 copyCodeDiv.addEventListener("click", () =>
  navigator.clipboard.writeText(`
    fetch('${url}')
    .then(response => response.json())
    .then(json => console.log(json))`)
 );

 cardHeaderDiv.appendChild(headerCodeDiv);
 cardHeaderDiv.appendChild(copyCodeDiv);

 outPutDiv.innerHTML = `<pre>${syntaxHighlight(JSON.stringify(json, undefined, 4))}</pre>`;

 cardDiv.appendChild(cardHeaderDiv);
 cardDiv.appendChild(outPutDiv);

 carousel.prepend(cardDiv);

 sliderBtn(carousel);
};

*/
