
import downward from "./assets/images/downward.png"
import caturanga from "./assets/images/caturanga.png"
import plank from "./assets/images/plank.png"
import utanasana from "./assets/images/utanasana.png"
import bhjungasana from "./assets/images/bhjungasana.png"
import lowlunge from "./assets/images/lowlunge.png"
import balasana from "./assets/images/balasana.png"

const cardsContainer = document.getElementById("cards-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const currentEl = document.getElementById("current");
const showBtn = document.getElementById("show");
const hideBtn = document.getElementById("hide");
const questionEl = document.getElementById("question");
const sanskirtEl = document.getElementById("sanskirt");
const answerEl = document.getElementById("answer");
const addCardBtn = document.getElementById("add-card");
const addImageBtn = document.getElementById("add-image")
const cuesEl = document.getElementById("cues");

const clearBtn = document.getElementById("clear");

const addContainer = document.getElementById("add-container");

//keep track of current card
let currentActiveCard = 0;

//store dom cards
const cardsEl = [];

//store card data
const cardsData = [
  {
    sanskirt: "Adho Muka Shavasana",
    answer: "Downward Dog",
    cues: "Press firmly into your hands",
    imgUrl: `${downward}`
  },
  {
    sanskirt: "shalambasana",
    answer: "Intense Forward Fold",
    cues: "tuck your chin",
    imgUrl:`${caturanga}`,
  },
  {
    sanskirt: "Plank",
    answer: "Plank",
    cues: "Firm up arms and legs",
    imgUrl:`${plank}`
  },
  {
    sanskirt: "Uttansana",
    answer: "Intense Forward Fold",
    cues: "Stack your bones vertically",
    imgUrl:`${utanasana}`
  },
  {
    sanskirt: "Low Lunge",
    answer: "Low Lunge",
    cues: "Lengthen your torso forward away from your crown",
    imgUrl:`${lowlunge}`,
  },
  {
    sanskirt: "Balasana",
    answer: "Childs Pose",
    cues: "Draw the hips down to the heels ",
    imgUrl:`${balasana}`
  },
  {
    sanskirt: "Bhujangasana",
    answer: "Cobra",
    cues: "Heavy your legs and hips to the floor",
    imgUrl:`${bhjungasana}`
  },
];

//show in sanskirt and some cues

//create all cards
function createCards() {
  cardsData.forEach((data, index) => {
    createCard(data, index);
  });
}

//create a single card in DOM

function createCard(data, index) {
  const card = document.createElement("div");
  card.classList.add("card");

  if(index === 0) {
    card.classList.add("active")
  }

  card.innerHTML = `
  <div class="inner-card">
    <div class="inner-card-front">
      <img id="imagePreview" src=${data.imgUrl} />
    </div>
    <div class="inner-card-back">

      <p><b> English: </b> ${data.answer}  </p>
      <p><b> Sanskirt: </b> ${data.sanskirt}</p>
      <p><b>Cues: </b> ${data.cues}</p>

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
function updateCurrentText(){
  currentEl.innerText = `${currentActiveCard + 1} / ${cardsEl.length}`
}

//get cards from local storage
function getCardsData(){
  const cards = JSON.parse(localStorage.getItem("cards"))
  return cards === null ? [] : cards;
}

//add card to local storagev
function setCardsData(cards){
  localStorage.setItem("cards", JSON.stringify(cards))
}

createCards();

//event listeners


//hide card to the left
nextBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className="card left"

  currentActiveCard = currentActiveCard + 1

  if(currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1
  }

  cardsEl[currentActiveCard].className= "card active";
  updateCurrentText();

})

//show container
showBtn.addEventListener("click", () => {
  addContainer.classList.add("show")
})

//hide addContainer
hideBtn.addEventListener("click", () => {
  addContainer.classList.remove("show")
})



prevBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className="card right"

  currentActiveCard = currentActiveCard - 1

  if(currentActiveCard < 0 ) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className= "card active";
  updateCurrentText();

})

clearBtn.addEventListener("click", () => {
  localStorage.clear();
  cardsContainer.innerHTML = "";
  window.location.reload();
})


addCardBtn.addEventListener("click", () => {
  const sanskirt = sanskirtEl.value;
  const answer = answerEl.value
  const cues = cuesEl.value
  let imgUrl = document.getElementById('uploadImage').files[0];
  var reader = new FileReader();
  reader.readAsDataURL(imgUrl);
  reader.onload = function () {
  localStorage.setItem("image", reader.result);
  document.getElementById("imageUploaded").setAttribute("src", localStorage.getItem("image"))
  };

  if(sanskirt.trim() && answer.trim()){
    const newCard = {sanskirt,answer,imgUrl, cues}
    createCard(newCard)

    sanskirtEl.value=""
    answerEl.value=""
    imgUrl =   document.getElementById("imageUploaded").setAttribute("src", localStorage.getItem("image"))

    cuesEl.value = ""

    addContainer.classList.remove("show")

    cardsData.push(newCard);
    setCardsData(cardsData)
  }

  console.log(sanskirt,answer, imgUrl)
})

// addImageBtn.addEventListener("click", () => {
//   const file = document.getElementById('uploadImage').files[0];
//   var reader = new FileReader();
//   reader.readAsDataURL(file);
//   reader.onload = function () {
//   localStorage.setItem("image", reader.result);
//   document.getElementById("imagePreview").setAttribute("src", localStorage.getItem("image"))
//   };
//
// })




function App() {
  return <div className="App"></div>;
}

export default App;
