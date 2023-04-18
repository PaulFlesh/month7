export function menuClassifier(type, link) {
  switch (type) {
    case 'icon': {
      if (link) {
        return 'primary'
      } else {
        return 'secondary'
      }
    }
    case 'text': {
      if (link) {
        return 'text_color_primary'
      } else {
        return 'text_color_inactive'
      }
    }
    default: {
      return null
    }
  }
};

export function orderStatusSelector(status) {
  switch (status) {
    case 'done': {
      return 'Выполнен'
    }
    case 'pending': {
      return 'Готовится'
    }
    case 'created': {
      return 'Создан'
    }
    default: {
      return 'Выполнен'
    }
  }
};

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
};

export function dragInsideCart(arr, actionId, targetIndex) {
  const draggableItem = arr.find((item) => (item._id === actionId));
  arr.splice(arr.indexOf(draggableItem), 1);
  arr.splice(targetIndex, 0, draggableItem);
  return arr;
};

export function deleteIngredient(arr, targetIndex) {
  arr.splice(targetIndex, 1);
  return arr;
};

export function increaseCounter(arr, actionId) {
  const item = arr.find(item => item._id === actionId);
  item.count++;
  return arr;
};

export function decreaseCounter(arr, actionId) {
  const item = arr.find(item => item._id === actionId);
  item.count--;
  return arr;
};

export function getTotal(buns, mains) {
  if (buns.length !== 0) {
    const doubledPriceBun = buns.price * 2;
    const mainsPrice = mains.reduce((prev, item) => {
      return prev + item.price;
    }, 0);
    return doubledPriceBun + mainsPrice
  } else {
    return 0;
  }
};

export function setBunType(position) {
  if (position === "first") {
    return "top";
  } else if (position === "last") {
    return "bottom";
  } else {
    return undefined;
  }
};

export function getCookie(name) {
  const matches = document.cookie.match( // eslint-disable-next-line
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export function setCookie(name, value, props) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
};

export function deleteCookie(name) {
  setCookie(name, null, { expires: -1 });
};

export function filterOrderStatus(orders) {
  const res = { done: [], pending: [] }
  orders.filter(item => {
    return item.status === "done"
      ? res.done.push(item.number)
      : res.pending.push(item.number)
  })
  return res
};

export function consolidate(arr) {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    if (res.indexOf(arr[i]) === -1) {
      res.push(arr[i]);
    }
  }
  return res
};

export function formattedDate(date) {
  const createdAt = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffTime = Math.ceil(
    (today.getTime() - createdAt.getTime()) / (60 * 60 * 24 * 1000)
  );
  const hours =
    createdAt.getHours() > 9
      ? createdAt.getHours()
      : `0${createdAt.getHours()}`;
  const min =
    createdAt.getMinutes() > 9
      ? createdAt.getMinutes()
      : `0${createdAt.getMinutes()}`;
  const getDays = (days) =>
    days === 0
      ? "Сегодня"
      : days === 1
        ? "Вчера"
        : days > 1
          ? `${days} дня(-ей) назад`
          : "Ошибка";
  return `${getDays(diffTime)}, ${hours}:${min}`;
};
