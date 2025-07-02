const questions =[{
        question:" Which major summit did India host in 2023, discussed into 2024?",
        answers:[
            {text:"G20 Summit", correct:true},
            {text:"BRICS", correct:false},
            {text:"ASEAN", correct:false},
            {text:"SCO", correct:false}
        ]
    },{
        question:"What is the capital of Ladakh?",
        answers:[
            {text:"Kargil", correct:false},
            {text:"Leh", correct:true},
            {text:"Srinagar", correct:false},
            {text:"Jammu", correct:false}
        ]
    },{
        question:"Which river is known as the 'Dakshin Ganga' (Ganges of the South)?",
        answers:[
            {text:"Krishna", correct:false},
            {text:"Kaveri", correct:false},
            {text:"Narmada", correct:false},
            {text:"Godavari", correct:true}
        ]
    },{
        question:"Which Indian monument is included among the ‘Seven Wonders of the World’?",
        answers:[
            {text:"Taj Mahal", correct:true},
            {text:"Qutub Minar", correct:false},
            {text:"Red Fort", correct:false},
            {text:"India Gate", correct:false}
        ]
    },{
        question:"Who wrote the Indian national anthem “Jana Gana Mana”?",
        answers:[
            {text:" Bankim Chandra Chatterjee", correct:false},
            {text:"Sarojini Naidu", correct:false},
            {text:"Kavi Pradeep", correct:false},
            {text:"Rabindranath Tagore", correct:true}
        ]
    }
];
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click',selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = 'none';
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add('correct');
        score++;
    }
    else{
        selectedBtn.classList.add('incorrect');
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextButton.style.display = 'block';
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Restart Quiz";
    nextButton.style.display = 'block';
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener('click',()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();