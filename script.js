
let totaltime = 100;

const timer = setInterval(() => {

    let minutes = Math.floor(totaltime / 60);
    let seconds = totaltime % 60;

    seconds = seconds < 10 ? "0" + seconds : seconds;

    document.getElementById("time").innerText =
        "Timer: " + minutes + ":" + seconds;

    // 🔻 When time is about to finish
    if (totaltime === 0) {
        clearInterval(timer);

        document.getElementById("time").innerText = "Time's UP ⏰";

        // 👉 Auto submit quiz
        autoSubmitQuiz();
        return;
    }

    // 🔻 Red warning under 30 seconds
    if (totaltime < 30) {
        document.getElementById("time").style.color = "maroon";
    }

    totaltime--;

}, 1000);



function autoSubmitQuiz() {
  // Hide quiz section
  document.querySelector(".quiz-container").classList.add("hide");

  // Show result section
  document.querySelector(".result").style.display = "flex";

  // Calculate score and show dashboard
  showResult();
}






// QUESTION OF QUIZ DATA STORE //

let questions =
[  
    {
    question: "Which country’s currency has Ganesh and Lakshmi printed on it?",
    options: ["India", "Sri Lanka", "Indonesia", "Nepal"],
    correctAnswer:2
  },

  {
    question: "What is a three-star police officer called?",
    options: ["SP", "DIG", "DGP", "ACP"],
    correctAnswer:2
  },

  {
    question: "How many states are there in America?",
    options: ["48", "50", "52", "49"],
    correctAnswer:1
  },

  {
    question: "Who first translated the Bhagavad Gita into English?",
    options: ["Max Muller", "Charles Wilkins", "William Jones", "Annie Besant"],
    correctAnswer:1
  },

  {
    question: "How many High Courts are there in India?",
    options: ["28", "27", "20", "25"],
    correctAnswer:3
  },

  {
    question: "Who is known as the Human Computer?",
    options: ["Sumita Devi", "Marie Curie", "Shakuntala Devi", "Grace Hopper"],
    correctAnswer:2
  },

  {
    question: "Honda company belongs to which country?",
    options: ["South Korea", "Japan", "United States", "Germany"],
    correctAnswer:1
  },

  {
    question: "Which is the lightest metal in the world?",
    options: ["Sodium", "Lithium", "Magnesium", "Beryllium"],
    correctAnswer:1
  },

  {
    question: "According to Hinduism, who was the first human?",
    options: ["Narayan", "Rishi Kashyap", "Adam", "Manu"],
    correctAnswer:3
  },

  {
    question: "Where is the largest prison of India located?",
    options: [
      "Lucknow – Naini Central Jail",
      "Delhi – Tihar Jail",
      "Jaipur – Central Jail",
      "Mumbai – Arthur Road Jail" 
    ],
    correctAnswer:1
  },

  

]  




// indexing //



let currentindex=0;
function loadQuestion()
{

    const questiontext=document.getElementById("questiontext");
    const optioncontainer=document.getElementById("optioncontainer");


    questiontext.textContent=questions[currentindex].question;
    optioncontainer.innerHTML=questions[currentindex].options.map((opt,index)=>
    
    `
    <label class="option">
    <input type="radio" name="quiz-option" value="${index}">
    ${opt}
</label>
`
    ).join("")


}

function nextQuestion() {


if (currentindex < questions.length-1) {
  currentindex++;
    loadQuestion();
        
  document.getElementById("question-number").textContent =`Q${currentindex+1}/${questions.length}`
} else {
    showResult();
}
}

loadQuestion()





//selected answer strorage//

let userAnswer=[]

function getSelectedAnswer()
{
  const choice=document.getElementsByName("quiz-option");

    for(let choose of choice)
    {
      if(choose.checked)
      {
        return Number(choose.value);
      }
    }

        return null;
}





function submitAnswer()
{
  const button = document.getElementById('submit-btn');
  const selectedAnswer=getSelectedAnswer();
  if(selectedAnswer===null)
  {
    alert("Please select an option");
    return;
// button.setAttribute('disabled', 'true');
  }

  // else {
  //   button.removeAttribute('disabled');
  // }

  userAnswer[currentindex]=selectedAnswer;
  nextQuestion();
}


//show result function//

function showResult()
{
  let score=0;

  questions.forEach((q,index)=>
  {
    if(userAnswer[index]===q.correctAnswer)
    {
      score++;
    }
  })

  showDashboard(score);
}




// function showDashboard(score) {
//   const result = document.querySelector(".result");

//   result.innerHTML = `
//     <div class="result-box">
//       <h2>Quiz Completed 🎉</h2>
//       <p>Total Questions: ${questions.length}</p>
//       <p>Correct Answers: ${score}</p>
//       <p>Wrong Answers: ${questions.length - score}</p>
//       <h1>Your Score: ${score}/${questions.length}</h1>
//     </div>
//   `;
// }












function restartQuiz() {
  localStorage.clear(); // optional: clears name, class, roll
  window.location.href = "quiz.html"; // your first page
}


function showDashboard(score) {
  // Hide quiz container
  document.querySelector(".quiz-container").classList.add("hide");

  // Show result dashboard
  const result = document.querySelector(".result");
  result.style.display = "flex";

  const name = localStorage.getItem("username") || "Guest";
  const userClass = localStorage.getItem("class") || "-";
  const roll = localStorage.getItem("roll") || "-";

  result.innerHTML = `
    <div class="dashboard full-dashboard">
      <h1 class="dashboard-title">🎉 Quiz Result</h1>

      <div class="user-info" style="margin-bottom:20px;">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Class:</strong> ${userClass}</p>
        <p><strong>Roll No:</strong> ${roll}</p>
      </div>

      <div class="score-circle">
        <span>${score}/${questions.length}</span>
      </div>

      <div class="stats">
        <div class="stat-card correct">
          <h2>${score}</h2>
          <p>Correct</p>
        </div>

        <div class="stat-card wrong">
          <h2>${questions.length - score}</h2>
          <p>Wrong</p>
        </div>

        <div class="stat-card total">
          <h2>${questions.length}</h2>
          <p>Total</p>
        </div>
      </div>

      <div class="result-actions">
        <button class="restart-btn" onclick="restartQuiz()">Restart Quiz</button>
      </div>
    </div>
  `;
}
