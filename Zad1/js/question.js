questionsJson = [
    {
        "text" : "Jak napiszesz \"Hello World\" w oknie alertu?",
        "choices" : ["alertBox(\"Hello World\")", "alert(\"Hello World\")","msg(\"Hello World\")", "msgBox(\"Hello World\")"],
        "answer" : "alert(\"Hello World\")"
    },
    {
        "text" : "Jak pisze się \"If\" w JavaScript?",
        "choices" : ["if i = 5 then", "if i = 5", "if (i==5)", "if i == 5 then"],
        "answer" : "if (i==5)"
    },
    {
        "text" : "Jak deklaruje się pętle for w JavaScript?",
        "choices" : ["for (i = 0; i<=5)", "for (i <=5; i++)",
        "for (i = 0; i <= 5; i++)", "for i = 1 to 5"],
        "answer" : "for (i = 0; i <= 5; i++)"
    },
    {
        "text" : "Jak zaokrąglić liczbę do najbliższej liczby całkowitej w JavaScript?",
        "choices" : ["Math.round(7.25)", "Math.rnd(7.25)", "round(7.25)",
        "rnd(7.25)"],
        "answer" : "Math.round(7.25)"
    },
    {
        "text" : "Która funkcja zwraca najwyższą wartość z liczb x i y w JavaScript?",
        "choices" : ["ceil(x,y)", "Math.ceil(x,y)", "Math.max(x,y)",
        "top(x,y)"],
        "answer" : "Math.max(x,y)"
    }
]

function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}


function Question(obj) {
    this.text = obj.text;
    this.choices = obj.choices;
    this.answer = obj.answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}


function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        const questionElement = document.getElementById("question");
        questionElement.innerHTML = quiz.getQuestionIndex().text;

        // show options
        const choices = quiz.getQuestionIndex().choices;
        for(let i = 0; i < choices.length; i++) {
            const choiceElement = document.getElementById("choice" + i);
            choiceElement.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
}

function guess(id, guess) {
    const button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
}


function showProgress() {
    const currentQuestionNumber = quiz.questionIndex + 1;
    const element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
}

function showScores() {
    let gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    const element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
}

const questions = questionsJson.map(x => new Question(x));
let quiz = new Quiz(questions);
populate();
