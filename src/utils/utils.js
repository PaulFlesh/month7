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
}

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

export function getCookie(name) {
  const matches = document.cookie.match( // eslint-disable-next-line
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)') 
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

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
}

export function deleteCookie(name) {
  setCookie(name, null, { expires: -1 });
}
