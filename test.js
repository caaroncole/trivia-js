const data = [
  {
    "type": "multiple",
    "difficulty": "medium",
    "category": "Science: Mathematics",
    "question": "Which greek mathematician ran through the streets of Syracuse naked while shouting &quot;Eureka&quot; after discovering the principle of displacement?",
    "correct_answer": "Archimedes",
    "incorrect_answers": [
      "Euclid",
      "Homer",
      "Eratosthenes"
    ]
  },
  {
    "type": "multiple",
    "difficulty": "medium",
    "category": "Science: Mathematics",
    "question": "What Greek letter is used to signify summation?",
    "correct_answer": "Sigma",
    "incorrect_answers": [
      "Delta",
      "Alpha",
      "Omega"
    ]
  },
  {
    "type": "multiple",
    "difficulty": "medium",
    "category": "Science: Mathematics",
    "question": "In the hexadecimal system, what number comes after 9?",
    "correct_answer": "The Letter A",
    "incorrect_answers": [
      "10",
      "The Number 0",
      "16"
    ]
  },
  {
    "type": "multiple",
    "difficulty": "medium",
    "category": "Science: Mathematics",
    "question": "What shape does sin(x) or cos(x) make on a graph?",
    "correct_answer": "Waves",
    "incorrect_answers": [
      "A Parabola",
      "A Straight Line",
      "Zig-Zags"
    ]
  },
  {
    "type": "multiple",
    "difficulty": "medium",
    "category": "Science: Mathematics",
    "question": "To the nearest whole number, how many radians are in a whole circle?",
    "correct_answer": "6",
    "incorrect_answers": [
      "3",
      "4",
      "5"
    ]
  },
  {
    "type": "multiple",
    "difficulty": "medium",
    "category": "Science: Mathematics",
    "question": "Which of the following dice is not a platonic solid?",
    "correct_answer": "10-sided die",
    "incorrect_answers": [
      "12-sided die",
      "20-sided die",
      "8-sided die"
    ]
  },
  {
    "type": "multiple",
    "difficulty": "medium",
    "category": "Science: Mathematics",
    "question": "What type of function is x&sup2;+2x+1?",
    "correct_answer": "Quadratic",
    "incorrect_answers": [
      "Rational",
      "Linear",
      "Exponential"
    ]
  },
  {
    "type": "multiple",
    "difficulty": "medium",
    "category": "Science: Mathematics",
    "question": "What are the first 6 digits of the number &quot;Pi&quot;?",
    "correct_answer": "3.14159",
    "incorrect_answers": [
      "3.14169",
      "3.12423",
      "3.25812"
    ]
  },
  {
    "type": "multiple",
    "difficulty": "medium",
    "category": "Science: Mathematics",
    "question": "What is the Roman numeral for 500?",
    "correct_answer": "D",
    "incorrect_answers": [
      "L",
      "C",
      "X"
    ]
  },
  {
    "type": "multiple",
    "difficulty": "medium",
    "category": "Science: Mathematics",
    "question": "What is the alphanumeric representation of the imaginary number?",
    "correct_answer": "i",
    "incorrect_answers": [
      "e",
      "n",
      "x"
    ]
  }
]


const getRandomIndex = (length) => Math.floor(Math.random() * length);

const getCurrentQuestion = (remainingQuestions, randomIndex) => ({
  question: remainingQuestions[randomIndex],
  updatedRemainingQuestions: remainingQuestions.filter((_, index) => index !== randomIndex)
});


const handleQuestionFlow = (data) => {
  let remainingQuestions = [...data]; //copy the data
  const randomIndex = getRandomIndex(remainingQuestions.length);
  const { question: currentQuestion, updatedRemainingQuestions } = getCurrentQuestion(remainingQuestions, randomIndex);

  return {
    currentQuestion,
    updatedRemainingQuestions
  }
};

const { currentQuestion, updatedRemainingQuestions } = handleQuestionFlow(data);
console.log("current question", currentQuestion)
console.log("original questions length", data.length)
console.log("remaining questions length", updatedRemainingQuestions.length)
