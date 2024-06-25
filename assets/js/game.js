const cities = [
  "Aghdam", "Agdash", "Aghjabadi", "Agstafa", "Agsu", "Astara", "Aghdara",
  "Babek", "Baku", "Balakən", "Barda", "Beylagan", "Bilasuvar", "Dashkasan",
  "Shabran", "Fuzuli", "Gadabay", "Ganja", "Goranboy", "Goychay", "Goygol",
  "Hajigabul", "Imishli", "Ismayilli", "Jabrayil", "Julfa", "Kalbajar",
  "Khachmaz", "Khankendi", "Khojavend", "Khirdalan", "Kurdamir", "Lankaran",
  "Lerik", "Masally", "Mingachevir", "Nakhchivan", "Naftalan", "Neftchala",
  "Oghuz", "Ordubad", "Qabala", "Qakh", "Qazakh", "Quba", "Qubadli", "Qusar",
  "Saatli", "Sabirabad", "Shahbuz", "Shaki", "Shamakhi", "Shamkir", "Sharur",
  "Shirvan", "Siyazan", "Shusha", "Sumgait", "Tartar", "Tovuz", "Ujar",
  "Yardimli", "Yevlakh", "Zaqatala", "Zardab", "Zangilan"
];

const playButton = document.querySelector(".button");
const tryAgainButton = document.querySelector(".button2");
const section1 = document.querySelector(".section1");
const section2 = document.querySelector(".section2");
const section3 = document.querySelector(".section3");
const lettersInput = document.querySelector(".letters");
const lifeSpan = document.querySelector(".life");
const scoreSpan = document.querySelector("#myScore");
const finalResultSpan = document.querySelector(".finalResult");

let currentWord = "";
let displayedWord = "";
let remainingLives = 6;
let score = 0;

function initializeGame() {
  currentWord = getRandomWord();
  displayedWord = "_".repeat(currentWord.length);
  remainingLives = 6;
  updateDisplay();
}

function updateDisplay() {
  lettersInput.value = displayedWord.split("").join(" ");
  lifeSpan.textContent = remainingLives;
  scoreSpan.textContent = score;
}

function checkLetter(letter) {
  let updated = false;
  for (let i = 0; i < currentWord.length; i++) {
    if (currentWord[i] === letter) {
      displayedWord = displayedWord.substr(0, i) + letter + displayedWord.substr(i + 1);
      updated = true;
    }
  }
  if (!updated) {
    remainingLives--;
  }
  if (displayedWord === currentWord) {
    score++;
    initializeGame();
  } else if (remainingLives <= 0) {
    gameOver();
  }
  updateDisplay();
}

function gameOver() {
  finalResultSpan.textContent = score;
  section2.style.display = "none";
  section3.style.display = "block";
}

playButton.addEventListener("click", () => {
  section1.style.display = "none";
  section2.style.display = "block";
  initializeGame();
});

tryAgainButton.addEventListener("click", () => {
  section3.style.display = "none";
  section1.style.display = "block";
  score = 0;
  initializeGame();
});

document.addEventListener("keydown", (event) => {
  if (section2.style.display === "block" && event.key.length === 1 && /[a-zA-Z]/.test(event.key)) {
    checkLetter(event.key.toUpperCase());
  }
});

function getRandomWord() {
  return cities[Math.floor(Math.random() * cities.length)];
}

// Start the game initially
initializeGame();
