function centerText(text: string, space: number, maxSize: boolean = true) {
  if (space < text.length) {
    throw new Error("text exceeds the maximum number of characters");
  }
  let spaceAround = space - text.length;
  const espaciosAntes = " ".repeat(Math.floor(spaceAround / 2));
  const espaciosDespues = " ".repeat(Math.ceil(spaceAround / 2));
  if (!maxSize) {
    const espaciosAntes = " ".repeat(Math.floor(space / 2));
    const espaciosDespues = " ".repeat(Math.ceil(space / 2));
  }

  return espaciosAntes + text + espaciosDespues;
}
function arrToText(arr: Array<string>) {
  let text = "";
  arr.forEach((line) => {
    text += line + "\n";
  });
  return text;
}
export { centerText, arrToText };
