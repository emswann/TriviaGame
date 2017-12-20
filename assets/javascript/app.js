/**
 * @file Main file for executing Trivia game.
 * @author Elaina Swann
 * @version 1.0 
 */

$(document).ready(function(){
  const MAXQTIME = 30,   /* Time given for answering question. */
        INTERVAL = 1000, /* Count down time interval. */
        TIMEOUT  = 5000; /* Time to display answer to question. */

  var arrQuestions = new Questions(),
      nQuestion    = 0,
      nTimeRemain  = 0, 
      intervalID,
      timeoutID;

  var audioInit = new Audio("assets/sound/WhoLetTheDogsOut.mp3");

  /** 
   * @function initialize 
   * @description Immediately invoked function which initializes game after document is loaded.
  */
  (function initialize() {
    $("#start-btn").show();
    $("#time-remain, #question-container, #answer-container, #result-container, #progress-container").hide();

    audioInit.play();
    audioInit.loop = true;
  })();

  /** 
   * @function startTimer 
   * @description Starts timer associated with counting length of time to answer a question.
  */
  function startTimer() {
    nTimeRemain = MAXQTIME + 1; /* Due to decrementing before displaying */

    renderTime();

    intervalID = setInterval(renderTime, INTERVAL);
  }

  /** 
   * @function stopTimer 
   * @description Stops timer associated with counting length of time to answer a question.
  */
  function stopTimer() {
    clearInterval(intervalID);
    intervalID = undefined;
  }

  /** 
   * @function processResults 
   * @description Calculates and returns result totals regarding answers to questions.
   * @returns {array} Result totals in the following order: correct, incorrect, unanswered.
  */
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

  /** 
   * @function renderTime 
   * @description Renders time container.
  */
  function renderTime() {
    $("#time-remain").text("Time Remaining: " + --nTimeRemain + " Seconds");

    if (nTimeRemain === 0) {
      stopTimer();
      renderAnswer();
    }
  }

  /** 
   * @function renderProgress 
   * @description Renders progress bar container.
  */
  function renderProgress() {
    var nProgress = (nQuestion + 1) * 10;

    $(".progress-bar").attr("aria-valuenow", nProgress)
                      .attr("style", "width:" + nProgress + "%")
                      .text(nProgress + "%");
  }

  /** 
   * @function renderQuestion 
   * @description Renders question container.
  */
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

  /** 
   * @function renderAnswer 
   * @description Renders answer container.
   * @param {Question} objQuestion - Question object for currently answered question.
  */
  function renderAnswer(objQuestion) {
    const PATH = "assets/images/"; // Needs the backslash at the end.

    $("#question-container").hide();
    $("#answer-container, #progress-container").show();

    renderProgress();

    var strText = "";
    var strID   = "no";
    if (typeof(objQuestion) === "undefined") {
      objQuestion = arrQuestions[nQuestion]; /* Need to assign to current question for proper rendering. */

      strText = "Out of Time!<br><br>Correct answer was:&nbsp&nbsp" + 
                objQuestion.choices[objQuestion.answer];
    }
    else if (objQuestion.isCorrect) {
      strText = "Correct!";
      strID = "yes";
    }
    else {
      strText = "Nope!<br><br>Correct answer was:&nbsp&nbsp" + 
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

  /** 
   * @function renderResults 
   * @description Renders results container.
  */
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

  /** 
   * @function clickStart 
   * @description Performs required processing when start or restart button is chosen.
  */
  function clickStart() {
    audioInit.pause();

    $("#start-btn, #answer-container, #result-container").hide();
    $("#time-remain").show();

    nQuestion = 0;

    renderQuestion();
  }

  /** 
   * @function clickAnswer 
   * @description Performs required processing when answer is chosen.
  */
  function clickAnswer() {
    stopTimer();

    var strChosen = $(this).children("button").attr("id"),
        objQuestion = arrQuestions[nQuestion];

    objQuestion.isCorrect = (parseInt(strChosen.charAt(strChosen.length-1)) === 
                                      objQuestion.answer) ? true : false;
  
    renderAnswer(objQuestion);
  }

  /** 
   * @event .on ("click") 
   * @listens .start When start or restart button is chosen. 
   * @param {function} clickStart
  */
  $(".start").on("click", clickStart);

  /** 
   * @event .on ("click") 
   * @listens .choice When answer for a question is chosen. 
   * @param {function} clickAnswer
  */
  $(".choice").on("click", clickAnswer);

  /*
    This code addresses the problem of the sticky hover on a touch screen device. The code was copied from the following website: http://www.javascriptkit.com/dhtmltutors/sticky-hover-issue-solutions.shtml
  */
  document.addEventListener('touchstart', function addtouchclass(e) {
    document.documentElement.classList.add('can-touch')
    document.removeEventListener('touchstart', addtouchclass, false)
  }, false)});