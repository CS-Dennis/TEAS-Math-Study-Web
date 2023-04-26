// clear localStorage
export const clearLocalStorage = () => {
  localStorage.clear();
};

// get a number between min and max inclusively
export const getRandomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// shuffle a list of items
export const shuffleList = (items) => {
  const length = items.length;
  const shuffledIndexes = [];
  items.forEach((item) => {
    let flag = false;
    while (!flag) {
      const newIndex = getRandomNum(0, length - 1);
      if (shuffledIndexes.findIndex((index) => index === newIndex) === -1) {
        // console.log(shuffledIndexes);
        // console.log(newIndex);
        shuffledIndexes.push(newIndex);
        flag = true;
      }
    }
  });
  const shuffledList = shuffledIndexes.map((index) => items[index]);
  return shuffledList;
};

// save a question in localStorage
export const saveQuestion = (questionDetail) => {
  // questionDetail object example
  // {
  //   index: 0,
  //   question: 'what is 1/2 in decimal form?',
  //   answer: null // true, false
  //   answers: [1,2,3,4],
  //   answerIndex: 0
  // }
  let allQuestions = JSON.parse(localStorage.getItem('questions'));
  const numsOfQuestions = parseInt(
    localStorage.getItem('numsOfQuestionsViewed'),
  );
  if (allQuestions === null) {
    allQuestions = [];
  }
  allQuestions.push(questionDetail);
  localStorage.setItem('questions', JSON.stringify(allQuestions));
  localStorage.setItem('numsOfQuestionsViewed', numsOfQuestions + 1);
};

// find the greatest common divisor between two numbers
export const gcdFromTwoNumbers = (x, y) => {
  if (typeof x !== 'number' || typeof y !== 'number') return false;
  x = Math.abs(x);
  y = Math.abs(y);
  while (y) {
    var t = y;
    y = x % y;
    x = t;
  }
  return x;
};
