//Quiz Data
const question = [
  {
    question: "assets/images/Alicia Keys.jpeg",
    answers: [
      { text: "Adele", correct: false },
      { text: "Kelly Clarkson", correct: false },
      { text: "Reba McEntire", correct: false },
      { text: "Alicia Keys", correct: true },
    ],
  },
  {
    question: "assets/images/Bruno Mars.jpg",
    answers: [
      { text: "Johnny Cash", correct: false },
      { text: "Bruno Mars", correct: true },
      { text: "Willie Nelson", correct: false },
      { text: "Eminem", correct: false },
    ],
  },
  {
    question: "assets/images/Chali2na.jpeg",
    answers: [
      { text: "The Eagles", correct: false },
      { text: "Tech N9ne", correct: false },
      { text: "Chali 2na", correct: true },
      { text: "Lil Wayne", correct: false },
    ],
  },
  {
    question: "assets/images/Dolly Parton.jpeg",
    answers: [
      { text: "Reba McEntire", correct: false },
      { text: "Alicia Keys", correct: false },
      { text: "Beyonce", correct: false },
      { text: "Dolly Parton", correct: true },
    ],
  },
  {
    question: "assets/images/Eminem.jpeg",
    answers: [
      { text: "Eminem", correct: true },
      { text: "Jay-Z", correct: false },
      { text: "Bruno Mars", correct: false },
      { text: "Tech N9ne", correct: false },
    ],
  },
  {
    question: "assets/images/JayZ.jpg",
    answers: [
      { text: "Jay-Z", correct: true },
      { text: "Lil Wayne", correct: false },
      { text: "Bruno Mars", correct: false },
      { text: "Johnny Cash", correct: false },
    ],
  },
  {
    question: "assets/images/Johnny cash.jpeg",
    answers: [
      { text: "Willie Nelson", correct: false },
      { text: "Johnny Cash", correct: true },
      { text: "Eminem", correct: false },
      { text: "Tech N9ne", correct: false },
    ],
  },
  {
    question: "assets/images/Kelly Clarkson.jpeg",
    answers: [
      { text: "TDolly Parton", correct: false },
      { text: "Adele", correct: false },
      { text: "Kelly Clarkson", correct: true },
      { text: "Alicia Keys", correct: false },
    ],
  },
  {
    question: "assets/images/Kenny Rogers.png",
    answers: [
      { text: "Johnny Cash", correct: false },
      { text: "Eminem", correct: false },
      { text: "Chali 2na", correct: false },
      { text: "Kenny Rogers", correct: true },
    ],
  },
  {
    question: "assets/images/Lil Wayne.jpeg",
    answers: [
      { text: "Lil Wayne", correct: true },
      { text: "Bruno Mars", correct: false },
      { text: "Chali 2na", correct: false },
      { text: "Tech N9ne", correct: false },
    ],
  },
  {
    question: "assets/images/Reba McEntire.jpeg",
    answers: [
      { text: "Alicia Keys", correct: false },
      { text: "Dolly Parton", correct: false },
      { text: "Adele", correct: false },
      { text: "Reba McEntire", correct: true },
    ],
  },
  {
    question: "assets/images/Willie Nelson.jpeg",
    answers: [
      { text: "Willie Nelson", correct: true },
      { text: "Jay-Z", correct: false },
      { text: "The Eagles", correct: false },
      { text: "Lil Wayne", correct: false },
    ],
  }
];

// Global variables
var index = 0;
var totalPoints=0;
var score = new Array();
var username = "";

// Restarts the quiz and sets the global variables back to their default values
function playAgain(){
    index = 0;
    totalPoints=0;
    document.getElementById("score").innerHTML="Score: "+totalPoints;
    start();

}

// Creates the html elements for pictures, options and highscores
function create(){ 
    const pictureDiv = document.getElementById("pic-div");
    const optionDiv = document.getElementById("option-div");
    const highscoreDiv = document.getElementById("highscore-div");
    pictureDiv.style.visibility="visible";
    optionDiv.style.visibility="visible";
    highscoreDiv.style.visibility="visible";
    optionDiv.innerHTML="";
    pictureDiv.innerHTML="";
    if(index<question.length){
        let q = document.createElement("img");
        q.setAttribute("width", "300");
        q.setAttribute("id","question");
        q.src=question[index]["question"];
        pictureDiv.append(q);
        for(let i=0; i<4; i++){
            let btn = document.createElement('button');
            btn.setAttribute("class","btn btn-sm btn-primary option");
            btn.innerHTML="&#9956 "+question[index]["answers"][i]["text"];
            btn.onclick=function(){
                check(question[index]["answers"][i]["correct"]);
            }
            optionDiv.append(btn);
        }
    }

    else{
        quizFinish();
        save(username, totalPoints);
        scoreBoardPage();
    }
    
}

//This function is called when quiz is started.
function start(){
    let name = document.getElementById("name").value;
    document.body.style.backgroundImage='url(assets/images/hero-bg.jpg)';
    if(name!=""){
        username = name;
    }
    else{
        alert("please Enter a Name!");
        return;
    }
    if(index<question.length){
        document.getElementById("start").disabled = true;
        document.getElementById("score").style.visibility="visible";
        document.getElementById("result").style.visibility='visible';
        document.getElementById("result").innerHTML="";
        document.getElementById('play-again').style.visibility='hidden';
        create();   
        scoreBoardPage(); 
    }
}
// This function checks whether the selected option is right or wrong.
function check(result){
    let resultField =  document.getElementById("result");
    index++;
    // If selected option is right, then add 1 points and print correct.
    if(result){
        totalPoints=totalPoints+1;
        document.getElementById("score").innerHTML="Score: "+totalPoints;
        resultField.innerHTML="Correct!";
        resultField.style.color="green";
    }
    else{
        resultField.innerHTML="Wrong!";
        resultField.style.color="red";

    }
    // Display the next question
    create();
}

// This function builds the elements when the quiz is finished.
function quizFinish(){
    // document.getElementById("start").disabled = false;
    document.getElementById("play-again").style.visibility = "visible";
    document.getElementById('result').style.visibility="hidden";
    const pictureDiv = document.getElementById("pic-div");
    const optionDiv = document.getElementById("option-div");
    pictureDiv.innerHTML ="";
    optionDiv.innerHTML="";
    let message = document.createElement("h1");
    message.innerHTML ="Quiz Finished!";
    optionDiv.append(message);
}

// This function saves the user score in the sessionstorage
function save(name, points){
    let entry = {"name":name, "points":points};
    score.push(entry);
    sessionStorage.setItem("score", JSON.stringify(score));
}


// This function bulilds elements for the high scores where top 5 scores are displayed in descending order
function scoreBoardPage(){
    const highscoreDiv = document.getElementById("highscore-div");
    highscoreDiv.innerHTML = "";
    let scores = JSON.parse(sessionStorage.getItem("score"));
    console.log(score);
    let h = document.createElement("p");
    h.setAttribute("id","top-5")
    h.innerHTML="Top 5 Scores"; 
    highscoreDiv.append(h);
    if(scores!=null){
        score=scores;
        score.sort( compare );
        let table = document.createElement('table');
        table.setAttribute("border",1);
        table.setAttribute("frame","hsides");
        table.setAttribute("rules","rows");
        let row = document.createElement('tr');
        let thead = document.createElement('th');
        let thead2 = document.createElement('th');
        thead.innerHTML='Name';
        row.append(thead);
        thead2.innerHTML="Score";
        row.append(thead2);
        table.append(row);
        for(let i=0; i<score.length; i++){
            if(i<5){
                let row1 = document.createElement('tr');
                let column1 = document.createElement('td');
                let column2 = document.createElement('td');
                column1.innerHTML=score[i]['name'];
                column2.innerHTML=score[i]['points'];
                row1.append(column1);
                row1.append(column2);
                table.append(row1);
            }
             
        }
        highscoreDiv.append(table);
        highscoreDiv.append(document.createElement("br"));
    }

    else{
        let noscore = document.createElement("p");
        noscore.innerHTML="No Scores Saved!";
        highscoreDiv.append(noscore);

    }
}

// Sorts the scores in descending order
function compare( a, b ) {
    if ( a.points > b.points ){
      return -1;
    }
    if ( a.points < b.points ){
      return 1;
    }
    return 0;
  }