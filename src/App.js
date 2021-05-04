import downward from "./assets/images/downward.png";
import caturanga from "./assets/images/caturanga.png";
import plank from "./assets/images/plank.png";
import utanasana from "./assets/images/utanasana.png";
import bhjungasana from "./assets/images/bhjungasana.png";
import lowlunge from "./assets/images/lowlunge.png";
import balasana from "./assets/images/balasana.png";

const cardsContainer = document.getElementById("cards-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const currentEl = document.getElementById("current");
const showBtn = document.getElementById("show");
const hideBtn = document.getElementById("hide");
// const questionEl = document.getElementById("question");
const sanskirtEl = document.getElementById("sanskirt");
const answerEl = document.getElementById("answer");
const addCardBtn = document.getElementById("add-card");
// const addImageBtn = document.getElementById("add-image")
const cuesEl = document.getElementById("cues");

const clearBtn = document.getElementById("clear");
const loadFile = document.getElementById("loadFile");
const addImgBtn = document.getElementById("addImgBtn");


const addContainer = document.getElementById("add-container");

//keep track of current card
let currentActiveCard = 0;

//store dom cards
const cardsEl = [];

//if i was pulling cards form local storage
const cardsData = getCardsData();
// const cardsData = [
//   {
//     sanskirt: "puis-je",
//     answer: "can i",
//     cues: "puis-je allez le store"
//   },
//   {
//     sanskirt: "pouvez-vous",
//     answer: " can you",
//     cues: "pouvez vous marche le chein"
//   },
//   {
//     sanskirt: "voulez-vous",
//     answer: "do you want",
//     cues: "voulez vous mange pizza avec moi"
//   },
//   {
//     sanskirt: "allez-vous",
//     answer: "are you going",
//     cues: "allez vous ala plage",
//   },
//   {
//     sanskirt: "dois-je",
//     answer: "do i have to",
//     cues: "dois je visite la grandma"
//   },
//   {
//     sanskirt: "manger",
//     answer: "to eat",
//     cues: "voulez vous mange pizza avec moi"
//   },
//   {
//     sanskirt: "boire",
//     answer: "to drink",
//     cues: "je vais boire avec mes amis",
//   },
//   {
//     sanskirt: "commander",
//     answer: "order",
//     cues: "je voudrais commander le bistec"
//   },
//   {
//     sanskirt: "dois-je",
//     answer: "do i have to",
//     cues: "dois je visite la grandma"
//   },
//   {
//     sanskirt: "faire",
//     answer: "to do / to make",
//     cues: "je veux faire un gateau"
//   },
//   {
//     sanskirt: "aller",
//     answer: "to go",
//     cues: "veux aller au cinema",
//   },
//   {
//     sanskirt: "avoir",
//     answer: "have",
//     cues: "j'ai un chien"
//   },
//
// ];


//show in sanskirt and some cues

//create all cards
function createCards() {
  cardsData.forEach((data, index) => {
    createCard(data, index);
  });
}

function createCard(data, index) {
  const card = document.createElement("div");
  card.classList.add("card");

  if (index === 0) {
    card.classList.add("active");
  }

  card.innerHTML = `
  <div class="inner-card">
    <div class="inner-card-front">
    <p><b> English: </b> ${data.answer}  </p>

    </div>
    <div class="inner-card-back">

      <p><b> French: </b> ${data.sanskirt}</p>
      <p><b>Sentence: </b> ${data.cues}</p>

    </div>
  </div>
  `;

  card.addEventListener("click", () => card.classList.toggle("show-answer"));

  //add to dom cards
  cardsEl.push(card);

  cardsContainer.appendChild(card);

  updateCurrentText();
}

//show number of cards
function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1} / ${cardsEl.length}`;
}

// get cards from local storage
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards === null ? [] : cards;
}

//add card to local storagev
function setCardsData(cards) {
  localStorage.setItem("cards", JSON.stringify(cards));
  window.location.reload()
}

createCards();

//event listeners

//hide card to the left
nextBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card left";

  currentActiveCard = currentActiveCard + 1;

  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }

  cardsEl[currentActiveCard].className = "card active";
  updateCurrentText();
});

//show container
showBtn.addEventListener("click", () => {
  addContainer.classList.add("show");
});

//hide addContainer
hideBtn.addEventListener("click", () => {
  addContainer.classList.remove("show");
});

prevBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card right";

  currentActiveCard = currentActiveCard - 1;

  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = "card active";
  updateCurrentText();
});




clearBtn.addEventListener("click", () => {
  localStorage.clear();
  cardsContainer.innerHTML = "";
  window.location.reload();
});



addCardBtn.addEventListener("click", () => {
  const sanskirt = sanskirtEl.value;
  const answer = answerEl.value;
  const cues = cuesEl.value;



  if (sanskirt.trim() && answer.trim()) {
    const newCard = { sanskirt, answer, cues };
    createCard(newCard);

    sanskirtEl.value = "";
    answerEl.value = "";
    cuesEl.value = "";

    addContainer.classList.remove("show");

    cardsData.push(newCard);
    console.log(newCard);
    setCardsData(cardsData);
  }

});



function App() {
  return <div className="App"></div>;
}

export default App;
