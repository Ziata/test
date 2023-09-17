export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  } else {
    return text.slice(0, maxLength - 3) + "...";
  }
}

export const generateUniqueId = () => {
  const array = new Uint32Array(2);
  crypto.getRandomValues(array);
  const timestamp = new Date().getTime();
  const randomNumber = array[0] % 10000;
  return `${timestamp}-${randomNumber}`;
};
