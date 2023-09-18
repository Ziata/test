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

export const formatDate = (inputDate: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date: Date = new Date(inputDate);
  return date.toLocaleDateString("en-US", options);
};
