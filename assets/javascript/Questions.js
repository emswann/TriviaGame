/**
 * @file Defines Questions object for executing Trivia game.
 * @author Elaina Swann
 * @version 1.0 
*/

/** 
 * @constructor Questions
 * @returns {array} Questions array containing Question objects.
*/
function Questions() {
  /* Handles case when constructor function called without new operator */
  if (!(this instanceof Questions)) {return new Questions();}

  /**
   * @class Question
   * @classdesc Question class object containing attributes for a single question.
  */
  class Question {
    /**
     * @constructor Question
     * @constructs {object} Contains attributes for a single question.
     * @property {string} question - Question user will try to answer.
     * @property {object} choices - 1 to n possible answers user can choose.
     * @property {number} answer - Correct answer corresponding to choices.
     * @property {boolean} isCorrect - Designates if user answered question correctly (true/false). Undefined means the user has not answered yet.
     * @property {string} image - Filename for rendered image.
    */
    constructor(question, choices, answer, image) {
      this.question = question;
      this.choices = choices;
      this.answer = answer;
      this.isCorrect = undefined; /* Unanswered question. */
      this.image = image;
    }
  }

  return (() => {
    let arrQuestions = [];

    /* Hard-coded questions because no back-end database interface for this project. */
    const TEXTFILE = 'What on a dog can be used to uniquely identify it in the same way fingerprints identify humans?^paw^tongue^nose^ear^0^paw.gif\nWhat do dogs do in a Schutzhund competition?^retrieve balls^attack padded people^chase animals^jump into water^1^attack.gif\nWhich of these dog breeds is the smallest?^American BullDog^Mastiff^Jack Russell Terrier^Maltese^3^maltese.gif\nWhat are Belton, Merle, Roan, Wheaten and Domino?^dog breeds^famous circus dogs^dog colors^famous military dogs^2^dog-colors.gif\nThe part of a dog\'s brain dedicated to analyzing smells is how much greater than a human\'s?^40^30^20^10^0^smell.gif\nWhat dog breed does not bark, but does make yodeling noises?^Rhodesian Ridgeback^Basenji^Bluetick Coonhound^Malamute^1^yodeling.gif\nWhat was the name of the dog on the "The Brady Bunch"^Duke^Archibald^Spot^Tiger^3^brady-bunch.gif\nHow many teeth does an adult dog have?^24^42^32^38^1^teeth.gif\nDogs sweat through what part of their body?^skin^mouth^paws^nose^2^sweating.gif\nWhat is the most common command taught dogs?^stay^beg^sit^roll over^2^sit.gif';

    const arrLines = TEXTFILE.split("\n");

    arrLines.forEach(line => {
      let arrFields = line.split("^");

      /* First field is the question. Last field is the image. Next to last is the answer. Get those first. Remaining fields are the 1..n choices. FORMAT = question^choices^answer^image */
      let question = arrFields.shift();
      let image    = arrFields.pop();
      let answer   = parseInt(arrFields.pop());
      // choices = arrFields.

      arrQuestions.push(new Question(question, arrFields, answer, image));
    });

    return arrQuestions;
  })();
}