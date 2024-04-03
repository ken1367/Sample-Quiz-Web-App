const quest = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Elephant", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Giraffe", correct: false }
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            { text: "Australia", correct: true },
            { text: "Asia", correct: false },
            { text: "Arctic", correct: false },
            { text: "Africa", correct: false }
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            { text: "Kalahari", correct: false },
            { text: "Sahara", correct: false },
            { text: "Thar", correct: false },
            { text: "Gobi", correct: true }
        ]
    }
];

const questEle = document.getElementById("question");
const ansbtn = document.getElementById("answer-but");
const nextbtn = document.getElementById("next-btn");
let curQInd = 0;
let score = 0;

function startQuiz() {
    curQInd = 0;
    score = 0;
    nextbtn.innerHTML = "Next";
    showQuest();
}

function showQuest() {
    resetState();
    let currQuest = quest[curQInd];
    let questNo = curQInd + 1;
    questEle.innerHTML = questNo + ". " + currQuest.question;

    currQuest.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        ansbtn.appendChild(button);
        button.addEventListener("click", selectAns);
    });
}

function resetState() {
    nextbtn.style.display = "none";
    while (ansbtn.firstChild) {
        ansbtn.removeChild(ansbtn.firstChild);
    }
}

function selectAns(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(ansbtn.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextbtn.style.display = "block";
}

nextbtn.addEventListener("click", () => {
    if (curQInd < quest.length - 1) {
        handleNxtBtn();
    } else {
        showScore();
    }
});

function handleNxtBtn() {
    curQInd++;
    showQuest();
}

function showScore() {
    resetState();
    questEle.innerHTML = `You scored ${score} out of ${quest.length}`;
    nextbtn.innerHTML = 'Play Again';
    nextbtn.style.display = 'block';
    nextbtn.addEventListener('click', startQuiz); // Add event listener to startQuiz() on 'Play Again' click
}

startQuiz();
