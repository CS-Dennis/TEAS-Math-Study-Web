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
