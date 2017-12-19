$(document).ready(function(){
  const MAXQTIME = 30,
        INTERVAL = 1000,
        TIMEOUT  = 5000;

  var arrQuestions = new Questions(),
      nQuestion    = 0,
      nTimeRemain  = 0, 
      intervalID,
      timeoutID;

  var audioInit = new Audio("assets/sound/WhoLetTheDogsOut.mp3");

  (function initialize() {
    $("#start-btn").show();
    $("#time-remain, #question-container, #answer-container, #result-container, #progress-container").hide();

    audioInit.play();
    audioInit.loop = true;
  })();

  function startTimer() {
    nTimeRemain = MAXQTIME + 1; /* Due to decrementing before displaying */

    renderTime();

    intervalID = setInterval(renderTime, INTERVAL);
  }

  function stopTimer() {
    clearInterval(intervalID);
    intervalID = undefined;
  }

  function processResults() {
    var nCorrect    = 0,
        nIncorrect  = 0,
        nUnanswered = 0;

    for (let i = 0; i < arrQuestions.length; i++) {

      /* If question has not been answered, it is undefined. */
      if (typeof(arrQuestions[i].isCorrect) === "undefined") {
        nUnanswered++;
      }
      else {
        (arrQuestions[i].isCorrect) ? nCorrect++ : nIncorrect++;
      }
    }

    return [nCorrect,
            nIncorrect,
            nUnanswered];
  }

  function renderTime() {
    $("#time-remain").text("Time Remaining: " + --nTimeRemain + " Seconds");

    if (nTimeRemain === 0) {
      stopTimer();
      renderAnswer();
    }
  }

  function renderProgress() {
    var nProgress = (nQuestion + 1) * 10;

    $(".progress-bar").attr("aria-valuenow", nProgress)
                      .attr("style", "width:" + nProgress + "%")
                      .text(nProgress + "%");
  }

  function renderQuestion() {
    $("#question-container").show();
    $("#answer-container").hide();

    startTimer();

    var objQuestion = arrQuestions[nQuestion];

    $("#question").text(objQuestion.question);

    for (let i = 0; i < objQuestion.choices.length; i++) {
      $("#choice-" + i).text(objQuestion.choices[i]);
    }
  }

  function renderAnswer(objQuestion) {
    const PATH = "assets/images/"; // Needs the backslash at the end.

    $("#question-container").hide();
    $("#answer-container, #progress-container").show();

    renderProgress();

    var strText = "";
    var strID   = "no";
    if (typeof(objQuestion) === "undefined") {
      objQuestion = arrQuestions[nQuestion]; /* Need to assign to current question for proper rendering. */

      strText = "Out of Time!<br><br>Correct answer was:&nbsp&nbsp&nbsp" + 
                objQuestion.choices[objQuestion.answer];
    }
    else if (objQuestion.isCorrect) {
      strText = "Correct!";
      strID = "yes";
    }
    else {
      strText = "Nope!<br><br>Correct answer was:&nbsp&nbsp&nbsp" + 
                objQuestion.choices[objQuestion.answer]; 
    }

    $("#answer-text").html("<h2 id='" + strID + "'" + ">" + strText + "</h2>");

    var imgDiv = $("<img>").addClass("img-responsive center-block")
                           .attr("id", "gif")
                           .attr("src", PATH + objQuestion.image)
                           .attr("alt", "Image for Answer");
    $("#answer-img").html(imgDiv);

    timeoutID = (++nQuestion === arrQuestions.length) ? 
                setTimeout(renderResults, TIMEOUT) : 
                setTimeout(renderQuestion, TIMEOUT);
  }

  function renderResults() {
    var results = [];

    $("#time-remain, #answer-container, #progress-container").hide();
    $("#result-container").show();

    results = processResults();

    $("#comment").text("You are done! Let's take a look at your results.");
    $("#correct").text("Correct Answers: " + results[0]);
    $("#incorrect").text("Incorrect Answers: " + results[1]);
    $("#unanswered").text("Unanswered: " + results[2]);    
  }

  function clickStart() {
    audioInit.pause();

    $("#start-btn, #answer-container, #result-container").hide();
    $("#time-remain").show();

    nQuestion = 0;

    renderQuestion();
  }

  function clickAnswer() {
    stopTimer();

    var strChosen = $(this).children("button").attr("id"),
        objQuestion = arrQuestions[nQuestion];

    objQuestion.isCorrect = (parseInt(strChosen.charAt(strChosen.length-1)) === 
                                      objQuestion.answer) ? true : false;
  
    renderAnswer(objQuestion);
  }

  $(".start").on("click", clickStart);
  $(".choice").on("click", clickAnswer);
});