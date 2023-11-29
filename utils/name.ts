import {pinyin} from 'pinyin-pro';

export function orderNameSorter<T extends {order: number, orderName: string}>(a: T, b: T): number {
  if (a.order != null && b.order != null) {
    return a.order - b.order;
  }
  if (a.order != null && b.order == null) {
    return -1;
  }
  if (a.order == null && b.order != null) {
    return 1;
  }
  return a.orderName < b.orderName ? -1 : 1;
}

/**
 * 中文：全名
 * 英文：姓
 * @param name
 */
export function getLastName(name: string): string {
  let lastName:string = null;
  try {
    if (name.length) {
      /** 处理名字中的中文，将其中的中文转化为拼音 */
      let modifiedName: string = name;
      if (hasChineseCharacter(name)) {
        modifiedName = name.split('').map((character, index) => {
          let word = character;
          if (isChineseCharacter(character)) {
            word = toPinYin(character, index === 0);
          }
          return word;
        }).join('');
      }

      /** 截取last name */
      modifiedName = modifiedName.split(',')[0];
      if (modifiedName.length) {
        const modifiedNameArr = modifiedName.split(' ');
        lastName = modifiedNameArr[modifiedNameArr.length - 1].toLowerCase();
      }
    }
  } catch (e) {
    console.log(e)
  }
  return lastName;
}

function toPinYin(character: string, isLastName): string {
  return pinyin(character, {
    toneType: 'none',
    type: 'string',
    mode: isLastName,
    v: true
  });
}

function hasChineseCharacter(str: string): boolean {
  return /[\u4E00-\u9FA5]/.test(str);
}

function isChineseCharacter(str: string): boolean {
  return /^[\u4E00-\u9FA5]$/.test(str);
}
