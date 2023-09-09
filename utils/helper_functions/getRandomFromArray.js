const getRandomFromArray = (array, amount, unique = true) => {
  let selected = [];
  while (selected.length !== amount) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const randomItem = array[randomIndex];
    if (unique && !selected.includes(randomItem)) selected.push(randomItem);
    if (!unique) selected.push(randomItem);
  }
  return selected;
};

export default getRandomFromArray;
