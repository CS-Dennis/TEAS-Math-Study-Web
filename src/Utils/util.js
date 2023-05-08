import { create, all } from 'mathjs';

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

const math = create(all, {});

// generate a random integer, decimal or fraction
export const generateNumber = (type) => {
  let number = 0;
  if (type === 1) {
    // integer
    number = getRandomNum(0, 100);
  } else if (type === 2) {
    // decimal
    number = getRandomNum(0, 100) / Math.pow(10, getRandomNum(0, 3));
  } else if (type === 3) {
    //fraction

    const numerator = getRandomNum(1, 100);
    const denominator = getRandomNum(2, 100);
    number = math.fraction(numerator + '/' + denominator);
  }

  return number;
};

// generate a set of random types (integer, decimal, fraction) of numbers (list size = length)
export const generateSetOfNumbers = (length) => {
  const list = [];
  for (let index = 0; index < length; index++) {
    const num = getRandomNum(1, 3);
    list.push(generateNumber(num));
  }
  return list;
};

// convert a list of random types of numbers to string
export const generateSetOfNumbersToString = (list) => {
  const stringList = [];
  list.forEach((number) => {
    if (typeof number === 'object') {
      stringList.push(number.n + '/' + number.d);
    } else {
      stringList.push(number.toString());
    }
  });
  return stringList;
};

// sort a list of random types of numbers
export const sortNumbers = (list, sortType) => {
  let copyList = [...list];
  if (sortType === 'asc') {
    console.log('asc');
    copyList = copyList.sort((a, b) => math.number(a) - math.number(b));
  } else if (sortType === 'dsc') {
    console.log('dsc');
    copyList.sort((a, b) => math.number(b) - math.number(a));
  }
  return copyList;
};
