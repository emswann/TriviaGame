$(document).ready(function(){
  var arrQuestions = new Questions();
  var nQuestion    = 0;
  var nTimeRemain  = 0;
  var timer;

  function initialize() {
    $("#start-btn").show();
    $("#time-remain, #question-container, #answer-container, #result-container").hide();

    nQuestion = 0;
    // play audio.
  };

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

  function renderQuestion() {
    var objQuestion = arrQuestions[nQuestion];

    $("#time-remain").text("Time Remaining: " + nTimeRemain + " Seconds");
    $("#question").text(objQuestion.question);

    // !! try using a map here.
    for (let i = 0; i < objQuestion.choices.length; i++) {
      $("#choice-" + i).html("<h2>" + objQuestion.choices[i] + "</h2>");
    }
  }

  function renderAnswer(objQuestion) {
    const PATH = "assets/images/"; // Needs the backslash at the end.
    $("#question-container").hide();
    $("#answer-container").show();

    var strText = (objQuestion.isCorrect) ? 
                  "Correct!" :
                  "Nope!<br>Correct answer was: " + 
                    objQuestion.choices[objQuestion.answer];

    $("#answer-text").html("<h3>" + strText + "</h3>");

    var imgDiv = $("<img>").addClass("img-responsive center-block")
                           .attr("src", PATH + objQuestion.image)
                           .attr("alt", "Image for Answer");
    $("#answer-img").html(imgDiv);
  }

  function renderResults() {
    var results = [];

    $("#answer-container").hide();
    $("#result-container").show();

    results = processResults();

    $("#comment").text("You are done! Let's take a look at your results.");
    $("#correct").text("Correct Answers: " + results[0]);
    $("#incorrect").text("Incorrect Answers: " + results[1]);
    $("#unanswered").text("Unanswered: " + results[2]);    
  }

  function clickStart() {
    $("#start-btn, #answer-container, #result-container").hide();
    $("#time-remain, #question-container").show();

    renderQuestion();
  }

  function clickAnswer() {
    var strChosen = $(this).children("button").attr("id"),
        objQuestion = arrQuestions[nQuestion];

    objQuestion.isCorrect = (parseInt(strChosen.charAt(strChosen.length-1)) === 
                                      objQuestion.answer) ? true : false;
  
    renderAnswer(objQuestion);
  }

  initialize();
  $(".start").on("click", clickStart);
  $(".choice").on("click", clickAnswer);
});