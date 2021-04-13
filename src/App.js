
import downward from "./assets/images/downward.png"
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
    answer: "bridge pose",
    cues: "tuck your chin",
    imgUrl:
      "https://d2ie288hwu80n0.cloudfront.net/works/25366/big-thumb-2020-10-23-SBUCmoKz5dWgl0uZjMRe1q6Se7Ad24tTp6sb013YNzS6klGfm-nbmByy6AP76WhFzNg4koRJRtOugHN3.jpg",
  },
  {
    sanskirt: "shalambasana",
    answer: "bridge pose",
    cues: "tuck your chin",
    imgUrl:
      "https://d2ie288hwu80n0.cloudfront.net/works/25366/big-thumb-2020-10-23-SBUCmoKz5dWgl0uZjMRe1q6Se7Ad24tTp6sb013YNzS6klGfm-nbmByy6AP76WhFzNg4koRJRtOugHN3.jpg",
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

  if (index === 0) {
    card.classList.add("active");
  }

  card.innerHTML = `
  <div class="inner-card">
    <div class="inner-card-front">
      <img src=${data.imgUrl} />
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
  let imgUrl = document.getElementById('uploadImage').files[0];
  var reader = new FileReader();
  reader.readAsDataURL(imgUrl);
  reader.onload = function () {
  localStorage.setItem("image", reader.result);
  document.getElementById("imagePreview").setAttribute("src", localStorage.getItem("image"))
  };

  if(sanskirt.trim() && answer.trim()){
    const newCard = {sanskirt,answer,imgUrl}
    createCard(newCard)

    sanskirtEl.value=""
    answerEl.value=""
    imgUrl = ""

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
