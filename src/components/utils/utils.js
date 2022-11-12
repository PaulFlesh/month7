export function isBun(ingredient) {
  if (ingredient.type === "bun") {
    return true;
  } else {
    return false;
  }
};

export function selectBun(arr) {
  return arr.find((el) => isBun(el));
};
