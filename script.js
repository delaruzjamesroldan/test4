let currentAnswer = 0;

let selectedOperation = "+";

let stats = {

correct:0,
wrong:0,
difficulty:"Easy"
};

let user = null;

function show(id){

document
.querySelectorAll(".screen")
.forEach(screen=>{

screen.classList.add("hidden");

});

document
.getElementById(id)
.classList.remove("hidden");

const navbar =
document.getElementById("navbar");

if(
id === "landing" ||
id === "nextPage" ||
id === "signin" ||
id === "signup" ||
id === "terms"
){

navbar.classList.add("hidden");

}else{

navbar.classList.remove("hidden");
}

updateAnalytics();
}

function goTerms(event){

event.preventDefault();

show("terms");
}

function signup(){

if(
!document
.getElementById("agree")
.checked
){

alert(
"Please agree first."
);

return;
}

const userData = {

name:
document
.getElementById("name")
.value,

email:
document
.getElementById("email")
.value,

pass:
document
.getElementById("pass")
.value
};

localStorage.setItem(
"user",
JSON.stringify(userData)
);

alert(
"Account created successfully!"
);

show("signin");
}

function login(event){

event.preventDefault();

const email =
document
.getElementById("loginEmail")
.value;

const pass =
document
.getElementById("loginPass")
.value;

const saved =
JSON.parse(
localStorage.getItem("user")
);

if(saved == null){

alert("No account found.");

return;
}

if(
email === saved.email &&
pass === saved.pass
){

user = saved;

document
.getElementById("editName")
.value = user.name;

show("dashboard");

}else{

alert(
"Incorrect email or password."
);
}
}

function openProfile(){

show("profile");
}

function saveProfile(){

user.name =
document
.getElementById("editName")
.value;

localStorage.setItem(
"user",
JSON.stringify(user)
);

alert(
"Profile updated!"
);
}

function changeProfile(event){

const file =
event.target.files[0];

if(file){

const reader =
new FileReader();

reader.onload = function(e){

document
.getElementById("profilePreview")
.src = e.target.result;

document
.getElementById("dashboardProfile")
.src = e.target.result;

document
.getElementById("gameProfile")
.src = e.target.result;

localStorage.setItem(
"profileImage",
e.target.result
);
};

reader.readAsDataURL(file);
}
}

function selectOperation(operation){

selectedOperation = operation;

show("difficultyPage");
}

function setDifficulty(level){

stats.difficulty = level;

startGame();
}

function startGame(){

show("game");

let max = 10;

if(stats.difficulty === "Medium"){
max = 30;
}

if(stats.difficulty === "Hard"){
max = 100;
}

let a =
Math.floor(Math.random()*max)+1;

let b =
Math.floor(Math.random()*max)+1;

switch(selectedOperation){

case "+":
currentAnswer = a+b;
break;

case "-":
currentAnswer = a-b;
break;

case "*":
currentAnswer = a*b;
break;

case "/":

currentAnswer = a;

a = a*b;

break;
}

document
.getElementById("question")
.textContent =
`${a} ${selectedOperation} ${b}`;

document
.getElementById("answer")
.value = "";
}

function submitAnswer(event){

event.preventDefault();

const answer =
parseInt(
document
.getElementById("answer")
.value
);

if(answer === currentAnswer){

stats.correct++;

document
.getElementById("resultText")
.textContent =
"Correct Answer!";

}else{

stats.wrong++;

document
.getElementById("resultText")
.textContent =
`Wrong! Correct Answer: ${currentAnswer}`;
}

adjustDifficulty();

updateAnalytics();

show("result");
}

function adjustDifficulty(){

const total =
stats.correct + stats.wrong;

const accuracy =
(total > 0)
?
(stats.correct/total)*100
:
0;

if(accuracy >= 80){

stats.difficulty = "Hard";

}else if(accuracy >= 50){

stats.difficulty = "Medium";

}else{

stats.difficulty = "Easy";
}
}

function updateAnalytics(){

const total =
stats.correct + stats.wrong;

const accuracy =
(total > 0)
?
Math.round(
(stats.correct/total)*100
)
:
0;

document
.getElementById("correctScore")
.textContent =
stats.correct;

document
.getElementById("wrongScore")
.textContent =
stats.wrong;

document
.getElementById("accuracyScore")
.textContent =
accuracy + "%";

document
.getElementById("difficulty")
.textContent =
stats.difficulty;

document
.getElementById("progressCorrect")
.textContent =
stats.correct;

document
.getElementById("progressWrong")
.textContent =
stats.wrong;

document
.getElementById("progressAccuracy")
.textContent =
accuracy + "%";
}

window.onload = function(){

show("landing");

const savedImage =
localStorage.getItem(
"profileImage"
);

if(savedImage){

document
.getElementById("profilePreview")
.src = savedImage;

document
.getElementById("dashboardProfile")
.src = savedImage;

document
.getElementById("gameProfile")
.src = savedImage;
}
};