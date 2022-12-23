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

export function hasBun(arr) {
  return arr.some((item) => isBun(item));
}

export function dragInsideCart(arr, actionId, targetIndex) {
  const deletedItem = arr.find((item) => (item._id === actionId));
  arr.splice(arr.indexOf(deletedItem), 1);
  arr.splice(targetIndex, 0, deletedItem);
  return arr;
};

export function deleteIngredient(arr, actionId) {
  const deletedItem = arr.find((item) => item._id === actionId);
  arr.splice(arr.indexOf(deletedItem), 1);
  return arr;
};

export function getTotal(buns, mains) {
  if (buns.length !== 0) {
    const doubledPriceBun = buns.price*2;
    const mainsPrice = mains.reduce((prev, item) => {
      return prev + item.price;
    }, 0);
    return doubledPriceBun + mainsPrice
  } else {
    return 0;
  }
}

export function setBunType(position) {
  if (position === "first") {
    return "top";
  } else if (position === "last") {
    return "bottom";
  } else {
    return undefined;
  }
};
