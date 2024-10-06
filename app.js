

//views
const menuHtml = `
  <div class="header">
    <h1>Welcome to the Trivia Game</h1>
  </div>
  <div>
  <img src="./orange.gif" alt="My Gif">
    <button class="play-button">Play Game</button>
  </div>
`

const playGameHtml = `
  <div class="header">
    <h1>Welcome to the Trivia Game</h1>
    <p id="remaining-question-count"></p>
  </div>
  <div class="content">
    <div class="current-question">Q</div>
    <div class="current-choices">1</div>
    <div class="current-choices">2</div>
    <div class="current-choices">3</div>
    <div class="current-choices">4</div>
  </div>
  <button class="next-question-button">Next Question</button>
`


let remainingQuestions = [];
let gameState = 'not_started';
// Pure function to get a random index based on the remaining questions length
const getRandomIndex = (length) => Math.floor(Math.random() * length);

// Pure function with implicit return to get the current question and update the remaining questions
const getQuestion = (randomIndex, remainingQuestions) => ({
  question: remainingQuestions[randomIndex],
  updatedRemainingQuestions: remainingQuestions.filter((_, index) => index !== randomIndex)
})


const handleQuestionFlow = () => {
  const randomIndex = getRandomIndex(remainingQuestions.length);
  const { question: currentQuestion, updatedRemainingQuestions } = getQuestion(randomIndex, remainingQuestions)
  remainingQuestions = updatedRemainingQuestions; //update the remaining questions with the updated remaining questions

  return {
    currentQuestion, updatedRemainingQuestions
  }
}

const shuffleArray = (choices) => [...choices].sort(() => Math.random() - 0.5)

const buildQuestion = () => {
  const {currentQuestion, currentQuestion: {correct_answer, incorrect_answers} } = handleQuestionFlow();
  const choices = [correct_answer, ...incorrect_answers];
  const shuffledChoices = shuffleArray(choices)
  
  return {
    currentQuestion,
    choices: shuffledChoices
  }
}

const checkAnswer = (event, currentQuestion, callback) => {
  const { correct_answer, incorrect_answers } = currentQuestion;
  if (event.target.innerText === correct_answer) {
    console.log("Correct Answer")
    callback(event.target, 'correct');
  } else {
    callback(event.target, 'incorrect');
  }
}

const appendQuestion = () => {
  if (remainingQuestions === 0) {
  nextQuestionButton.removeEventListener('click', startGame)
  }
  if (remainingQuestions.length > 0) {
    const { currentQuestion, choices } = buildQuestion(); //extract current question and choices
    // set up the html elements with the question and choices
    const appDiv = document.getElementById('app');
    appDiv.innerHTML = playGameHtml;
    const questionCount = document.getElementById('remaining-question-count');
    //display questions remainging length
    if (remainingQuestions.length === 0) {
      questionCount.textContent = `Last Question`;
    } else {
    questionCount.innerText = `${remainingQuestions.length} questions remaining.`;
    }
    // continue setting up html of questions and choices
    const nextQuestionButton = document.querySelector('.next-question-button');
    nextQuestionButton.disabled = true;
    const questionDiv = document.querySelector('.current-question');
    questionDiv.innerHTML = currentQuestion.question;
    const choiceDivs = document.querySelectorAll('.current-choices');
    choices.forEach((choice, index) => {
      choiceDivs[index].innerHTML = choice;
    })

    const handleClick = (event) => {
      checkAnswer(event, currentQuestion, (div, className) => {
        if (className === 'correct') {
          div.classList.add(className)
        } else {
          div.classList.add(className)
          choiceDivs.forEach((choice) => {
            if (choice.innerText.includes(currentQuestion.correct_answer)) {
              choice.classList.add('correct')
            }
          })
        }
      })
      nextQuestionButton.disabled = false;
      choiceDivs.forEach(choiceDiv => {
        choiceDiv.removeEventListener('click', handleClick)
      })
      if (remainingQuestions.length > 0) {
      nextQuestionButton.addEventListener('click', appendQuestion)
      } else {
        nextQuestionButton.removeEventListener('click', appendQuestion)
        nextQuestionButton.textContent = 'Play Again';
        nextQuestionButton.addEventListener('click', startGame)
        
      }
    }

    choiceDivs.forEach(choiceDiv => {
      choiceDiv.addEventListener('click', handleClick)
    })
  } else {
    console.log("game over")
  }
  }


const appendMenu = () => {
  const appDiv = document.getElementById('app');
  appDiv.innerHTML = menuHtml;
  const playButton = document.querySelector('.play-button');
  playButton.addEventListener('click', appendQuestion )
}
//fetch the api data
const fetchData = async() => {
  const response = await fetch('https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple');
  const data = await response.json()
  remainingQuestions = [...data.results];
  return remainingQuestions
}
const startGame = () => {
  appendMenu(fetchData())
}

if (gameState === 'not_started') appendMenu(fetchData());



