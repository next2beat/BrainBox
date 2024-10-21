// Questions data
const questions = [
    { id: 1, question: 'Which of the following is a synonym of "happy"?', options: ['Sad', 'Angry', 'Joyful', 'Bored'], answer: 3 },
    { id: 2, question: 'What is the plural form of "child"?', options: ['Childs', 'Children', 'Childes', 'Childrens'], answer: 2 },
    { id: 3, question: 'Which of the following is a noun?', options: ['Run', 'Blue', 'Dog', 'Quickly'], answer: 3 },
    { id: 4, question: 'Choose the correct article: "She is ___ honest person."', options: ['a', 'an', 'the', 'no article needed'], answer: 2 },
    { id: 5, question: 'Which of the following is a verb?', options: ['Beauty', 'Beautiful', 'Run', 'Quick'], answer: 3 },
    { id: 6, question: 'Identify the correct sentence:', options: ['He going to school.', 'He is going to school.', 'He are going to school.', 'He go to school.'], answer: 2 },
    { id: 7, question: 'Which of the following is a conjunction?', options: ['And', 'Very', 'Quick', 'House'], answer: 1 },
    { id: 8, question: 'What is the past tense of "eat"?', options: ['Eated', 'Eating', 'Ate', 'Eats'], answer: 3 },
    { id: 9, question: 'Which word is an adjective?', options: ['Run', 'Beautiful', 'Happily', 'House'], answer: 2 },
    { id: 10, question: 'Choose the correct spelling:', options: ['Definately', 'Definitly', 'Definitely', 'Definate'], answer: 3 }
];

let score = 0;
let totalAttempted = 0;
let currentQuestionIndex = 0;
let answers = Array(questions.length).fill(null); // Track all selected answers

function updateAttemptedCounter() {
    totalAttempted = answers.filter(answer => answer !== null).length;
    const attemptedCounter = document.getElementById('attempted-counter');
    attemptedCounter.innerText = `${totalAttempted} / ${questions.length}`;
}

// Function to shuffle questions
function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}

// Function to display the current question
function displayQuestion() {
    if (currentQuestionIndex < questions.length) {
        // Display the question in the "Question Board" div (id="1")
        const questionContainer = document.getElementById('question-container');
        questionContainer.innerHTML = ''; // Clear any previous question
        
        const question = questions[currentQuestionIndex];
        const questionElement = document.createElement('h2');
        questionElement.innerText = question.question;
        
        questionContainer.appendChild(questionElement);

        // Display the answer options in the "Options Box" div (id="options-box")
        const optionsBox = document.getElementById('options-box');
        optionsBox.innerHTML = ''; // Clear previous options
        
        const optionsList = document.createElement('ul');
        question.options.forEach((option, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<input type="radio" name="answer" value="${index + 1}" 
            ${answers[currentQuestionIndex] === index + 1 ? 'checked' : ''}> ${option}`;
            optionsList.appendChild(listItem);
        });

        optionsBox.appendChild(optionsList); // Append options to the Options Box
    }
}

// Function to submit answer for the current question
function submitAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        const answerIndex = parseInt(selectedOption.value);
        answers[currentQuestionIndex] = answerIndex;
        updateAttemptedCounter();
    }
}

// Button handlers
document.getElementById('clear-btn').onclick = function () {
    answers[currentQuestionIndex] = null;
    displayQuestion();
    updateAttemptedCounter();
};

document.getElementById('prev-btn').onclick = function () {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
};

document.getElementById('next-btn').onclick = function () {
    // Save the answer before moving forward
    submitAnswer(); 

    if (currentQuestionIndex < questions.length - 1) {
        // If there are more questions, increment the index and display the next question
        currentQuestionIndex++;
        displayQuestion();
    } else {
        // If it's the last question, show the score instead
        showScore();
    }
};

document.getElementById('submit-btn').onclick = function () {
    submitAnswer(); // Submit current answer before displaying results
    showScore();
};

// Function to display score
function showScore() {
    let score = 0;
    answers.forEach((answer, index) => {
        if (answer === questions[index].answer) {
            score++;
        }
    });
    const questionContainer = document.getElementById('question-container');
    const answerBox = document.getElementById('options-box');

    // Clear the answer box
    answerBox.innerHTML = ''; 

    questionContainer.innerHTML = `<h2>Your Score: ${score} out of ${questions.length}</h2>`;
    document.getElementById('clear-btn').style.display = 'none';
    document.getElementById('prev-btn').style.display = 'none';
    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('submit-btn').style.display = 'none';    
};

// Start the quiz
window.onload = function() {
    shuffleQuestions();
    displayQuestion();
};

document.addEventListener("DOMContentLoaded", function() {
    shuffleQuestions();
    displayQuestion();
});

function confirmQuit() {
    const userConfirmation = confirm("Are you sure you want to quit?");
    if (userConfirmation) {
        // Actions to take if the user confirms quitting
        window.location.href = "../../Subject Server/English/EnglishMain.html"; // Redirect to an exit page or any action you'd like
    }
}
