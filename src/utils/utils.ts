import { IIngredient, IOrder, TFilter } from "../constants/constants";

export function menuClassifier(type: string, link: string | undefined): any { // any
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

export function orderStatusSelector(status: string): string {
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

export function isBun(ingredient: IIngredient): boolean {
  if (ingredient.type === "bun") {
    return true
  } else {
    return false
  }
};

export function selectBun(arr: Array<IIngredient>): IIngredient | undefined {
  return arr.find(el => isBun(el));
};

export function hasBun(arr: Array<IIngredient>): boolean {
  return arr.some(item => isBun(item));
};

export function dragInsideCart(arr: Array<IIngredient>, actionId: string, targetIndex: number): Array<IIngredient> {
  const draggableItem = arr.find(item => item._id === actionId);
  if (draggableItem !== undefined) {
    arr.splice(arr.indexOf(draggableItem), 1);
    arr.splice(targetIndex, 0, draggableItem);
    return arr;
  } else return arr;
};

export function getTotal(bun: IIngredient | null, mains: Array<IIngredient>): number {
  if (bun !== null) {
    const doubledPriceBun: number = bun.price * 2;
    if (mains.length < 1) {
      return doubledPriceBun
    } else {
      const mainsPrice: number = mains.reduce((prev, item) => {
        return prev + item.price;
      }, 0);
      return doubledPriceBun + mainsPrice
    }
  } else {
    return 0;
  }
};

export function setBunType(position: string): string | undefined {
  if (position === "first") {
    return "top";
  } else if (position === "last") {
    return "bottom";
  } else {
    return undefined;
  }
};

export function getCookie(name: string): string | undefined {
  const matches = document.cookie.match( // eslint-disable-next-line
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export function setCookie(
  name: string,
  value: string,
  props: { [key: string]: any } & { expires?: number | Date | string } = {}
): void {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && (exp as Date).toUTCString) {
    props.expires = (exp as Date).toUTCString();
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

export function deleteCookie(name: string): void {
  setCookie(name, '', { expires: -1 });
};

export function filterOrderStatus(orders: Array<IOrder>): TFilter {
  const res: TFilter = { done: [], pending: [] }
  orders.filter(item => {
    return item.status === "done"
      ? res.done.push(item.number)
      : res.pending.push(item.number)
  })
  return res
};

export function consolidate(arr: Array<IIngredient>): Array<IIngredient> {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    if (res.indexOf(arr[i]) === -1) {
      res.push(arr[i]);
    }
  }
  return res
};

export function formattedDate(date: Date | string): string {
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
  const getDays = (days: number) =>
    days === 0
      ? "Сегодня"
      : days === 1
        ? "Вчера"
        : days > 1
          ? `${days} дня(-ей) назад`
          : "Ошибка";
  return `${getDays(diffTime)}, ${hours}:${min}`;
};
