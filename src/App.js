const cardsContainer = document.getElementById("cards-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const currentEl = document.getElementById("current");
const showBtn = document.getElementById("show");
const hideBtn = document.getElementById("hide");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const addCardBtn = document.getElementById("add-card");
const clearBtn = document.getElementById("clear");
const image = document.getElementById("image");

const addContainer = document.getElementById("add-container");

//keep track of current card
let currentActiveCard = 0;

//store dom cards
const cardsEl = [];

//store card data
const cardsData=[
  {
    answer: "bridge pose",
    cues: "tuck your chin",
    imgUrl:"https://d2ie288hwu80n0.cloudfront.net/works/25366/big-thumb-2020-10-23-SBUCmoKz5dWgl0uZjMRe1q6Se7Ad24tTp6sb013YNzS6klGfm-nbmByy6AP76WhFzNg4koRJRtOugHN3.jpg"
  },
  {
    answer: "good how are you",
    imgUrl:"https://d2ie288hwu80n0.cloudfront.net/works/25366/big-thumb-2020-10-23-SBUCmoKz5dWgl0uZjMRe1q6Se7Ad24tTp6sb013YNzS6klGfm-nbmByy6AP76WhFzNg4koRJRtOugHN3.jpg"
  },
  {
    answer: "test test test",
    imgUrl:"https://d2ie288hwu80n0.cloudfront.net/works/25366/big-thumb-2020-10-23-SBUCmoKz5dWgl0uZjMRe1q6Se7Ad24tTp6sb013YNzS6klGfm-nbmByy6AP76WhFzNg4koRJRtOugHN3.jpg"
  }
];

//show in sanskirt and some cues

//create all cards
function createCards(){
  cardsData.forEach( (data,index) => {
    createCard(data,index)
  })
}

//create a single card in DOM

function createCard(data, index) {
  const card = document.createElement("div")
  card.classList.add("card")

  if( index === 0) {
    card.classList.add("active")
  }

  card.innerHTML = `
  <div class="inner-card">
    <div class="inner-card-front">
      <img src=${data.imgUrl} />
    </div>
    <div class="inner-card-back">
      <p>Pose: ${data.answer}</p>
      <hr>
      <p>Cues: ${data.cues}</p>

    </div>
  </div>
  `;

  card.addEventListener("click", () => card.classList.toggle("show-answer"))

  //add to dom cards
  cardsEl.push(card);

  cardsContainer.appendChild(card)

}
createCards();

function App() {
  return <div className="App"></div>;
}

export default App;
