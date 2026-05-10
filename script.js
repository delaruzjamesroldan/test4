// script.js

let user = null;

let selectedCategory = "Arithmetic";

let currentAnswer = 0;

let stats = {
    correct:0,
    wrong:0,
    difficulty:"Easy"
};

/* ================= START ================= */

window.onload = function(){

    show("landing");

    document
    .getElementById("navbar")
    .classList.add("hidden");
};

/* ================= PAGE NAVIGATION ================= */

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

/* ================= TERMS ================= */

function goTerms(event){

    event.preventDefault();

    show("terms");
}

/* ================= SIGNUP ================= */

function signup(){

    if(
        !document
        .getElementById("agree")
        .checked
    ){

        alert(
            "Please agree to the Terms & Conditions first."
        );

        return;
    }

    const userData = {

        name:
        document
        .getElementById("name")
        .value.trim(),

        email:
        document
        .getElementById("email")
        .value.trim(),

        pass:
        document
        .getElementById("pass")
        .value.trim()
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

/* ================= LOGIN ================= */

function login(event){

    event.preventDefault();

    const email =
    document
    .getElementById("loginEmail")
    .value.trim();

    const pass =
    document
    .getElementById("loginPass")
    .value.trim();

    const saved =
    JSON.parse(
        localStorage.getItem("user")
    );

    if(saved == null){

        alert(
            "No account found."
        );

        return;
    }

    if(
        email === saved.email &&
        pass === saved.pass
    ){

        user = saved;

        openProfileData();

        show("dashboard");

    }else{

        alert(
            "Incorrect email or password."
        );
    }
}

/* ================= PROFILE ================= */

function openProfile(){

    openProfileData();

    show("profile");
}

function openProfileData(){

    if(user){

        document
        .getElementById(
            "editName"
        ).value = user.name;

        document
        .getElementById(
            "editEmail"
        ).value = user.email;

        document
        .getElementById(
            "profileDisplayName"
        ).textContent = user.name;
    }

    const savedImage =
    localStorage.getItem(
        "profileImage"
    );

    if(savedImage){

        document
        .getElementById(
            "profilePreview"
        ).src = savedImage;

        document
        .getElementById(
            "dashboardProfile"
        ).src = savedImage;

        document
        .getElementById(
            "gameProfile"
        ).src = savedImage;
    }
}

/* ================= PROFILE IMAGE ================= */

function changeProfile(event){

    const file =
    event.target.files[0];

    if(file){

        const reader =
        new FileReader();

        reader.onload = function(e){

            document
            .getElementById(
                "profilePreview"
            ).src = e.target.result;

            document
            .getElementById(
                "dashboardProfile"
            ).src = e.target.result;

            document
            .getElementById(
                "gameProfile"
            ).src = e.target.result;

            localStorage.setItem(
                "profileImage",
                e.target.result
            );
        };

        reader.readAsDataURL(file);
    }
}

/* ================= SAVE PROFILE ================= */

function saveProfile(){

    const saved =
    JSON.parse(
        localStorage.getItem("user")
    );

    saved.name =
    document
    .getElementById(
        "editName"
    ).value;

    saved.email =
    document
    .getElementById(
        "editEmail"
    ).value;

    localStorage.setItem(
        "user",
        JSON.stringify(saved)
    );

    user = saved;

    document
    .getElementById(
        "profileDisplayName"
    ).textContent = saved.name;

    alert(
        "Profile updated successfully!"
    );
}

/* ================= CATEGORY ================= */

function selectCategory(category){

    selectedCategory = category;

    document
    .getElementById(
        "gameCategory"
    ).textContent = category;

    show("difficultyPage");
}

/* ================= DIFFICULTY ================= */

function setDifficulty(level){

    stats.difficulty = level;

    startGame();
}

/* ================= START GAME ================= */

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

    const operations =
    ["+","-","*"];

    const op =
    operations[
        Math.floor(Math.random()*operations.length)
    ];

    switch(op){

        case "+":
            currentAnswer = a+b;
            break;

        case "-":
            currentAnswer = a-b;
            break;

        case "*":
            currentAnswer = a*b;
            break;
    }

    document
    .getElementById(
        "question"
    ).textContent =
    `${a} ${op} ${b}`;

    document
    .getElementById(
        "answer"
    ).value = "";
}

/* ================= SUBMIT ANSWER ================= */

function submitAnswer(event){

    event.preventDefault();

    const answer =
    parseInt(
        document
        .getElementById(
            "answer"
        ).value
    );

    if(answer === currentAnswer){

        stats.correct++;

        document
        .getElementById(
            "resultText"
        ).textContent =
        "Correct Answer!";

    }else{

        stats.wrong++;

        document
        .getElementById(
            "resultText"
        ).textContent =
        `Wrong! Correct Answer: ${currentAnswer}`;
    }

    autoAdjustDifficulty();

    updateAnalytics();

    show("result");
}

/* ================= ADAPTIVE SYSTEM ================= */

function autoAdjustDifficulty(){

    const total =
    stats.correct + stats.wrong;

    const accuracy =
    total > 0
    ? (stats.correct/total)*100
    : 0;

    if(accuracy >= 80){

        stats.difficulty = "Hard";

    }else if(accuracy >= 50){

        stats.difficulty = "Medium";

    }else{

        stats.difficulty = "Easy";
    }
}

/* ================= ANALYTICS ================= */

function updateAnalytics(){

    const total =
    stats.correct + stats.wrong;

    const accuracy =
    total > 0
    ? Math.round(
        (stats.correct/total)*100
    )
    : 0;

    document
    .getElementById(
        "accuracyScore"
    ).textContent =
    accuracy + "%";

    document
    .getElementById(
        "difficulty"
    ).textContent =
    stats.difficulty;

    document
    .getElementById(
        "correctScore"
    ).textContent =
    stats.correct;

    document
    .getElementById(
        "wrongScore"
    ).textContent =
    stats.wrong;

    document
    .getElementById(
        "progressCorrect"
    ).textContent =
    stats.correct;

    document
    .getElementById(
        "progressWrong"
    ).textContent =
    stats.wrong;

    document
    .getElementById(
        "progressAccuracy"
    ).textContent =
    accuracy + "%";

    document
    .getElementById(
        "gameDifficulty"
    ).textContent =
    stats.difficulty;

    document
    .getElementById(
        "gameAccuracy"
    ).textContent =
    accuracy + "%";
}