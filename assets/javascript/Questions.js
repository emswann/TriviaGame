/**
 * @file Defines Questions object for executing trivia game.
 * @author Elaina Swann
 * @version 1.0 
 */

/** 
 * @constructor Questions
 * @constructs {object} Contains a Questions array containing Question objects.
*/
function Questions(strFileName) {

  /** 
   * @constructor Question 
   * @constructs {object} Contains attributes for a single question.
  */
  function Question() {
    this.question   = "";
    this.choices    = [];
    this.answer     = -1;
    this.isCorrect  = undefined; /* Initialize to undefined to evaluate unanswered questions. */
    this.image      = "";
  }

  return (function() {
    var arrQuestions = [];

    /* Doing this until can read local file regardless of browser type. */
    var strTextFile = 'What on a dog can be used to uniquely identify it in the same way fingerprints identify humans?^paw^tongue^nose^ear^0^paw.gif\nWhat do dogs do in a Schutzhund competition?^retrieve balls^attack padded people^chase animals^jump into water^1^attack.gif\nWhich of these dog breeds is the smallest?^American BullDog^Mastiff^Jack Russell Terrier^Maltese^3^maltese.gif\nWhat are Belton, Merle, Roan, Wheaten and Domino?^dog breeds^famous circus dogs^dog colors^famous military dogs^2^dog-colors.gif\nThe part of a dog\'s brain dedicated to analyzing smells is how much greater than a human\'s?^40^30^20^10^0^smell.gif\nWhat dog breed does not bark, but does make yodeling noises?^Rhodesian Ridgeback^Basenji^Bluetick Coonhound^Malamute^1^yodeling.gif\nWhat was the name of the dog on the "The Brady Bunch"^Duke^Archibald^Spot^Tiger^3^brady-bunch.gif\nHow many teeth does an adult dog have?^24^42^32^38^1^teeth.gif\nDogs sweat through what part of their body?^skin^mouth^paws^nose^2^sweating.gif\nWhat is the most common command taught dogs?^stay^beg^sit^roll over^2^sit.gif';

    var lines = strTextFile.split("\n");

    for (let i = 0; i < lines.length; i++) {
      var fields = lines[i].split("^");
      var objQuestion = new Question();

      /* First field is the question. last field is the image and next to last is the answer. Get those first. Then, process remaining fields as 1..n choices. */
      objQuestion.question = fields.shift();
      objQuestion.image    = fields.pop();
      objQuestion.answer   = parseInt(fields.pop());
      for  (let j = 0; j < fields.length; j++) {
        objQuestion.choices.push(fields[j]);
      }

      arrQuestions.push(objQuestion);
    }

    return arrQuestions;
  })();
}