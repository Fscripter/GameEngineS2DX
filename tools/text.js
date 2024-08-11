"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrToText = exports.centerText = void 0;
function centerText(text, space, maxSize = true) {
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
exports.centerText = centerText;
function arrToText(arr) {
    let text = "";
    arr.forEach((line) => {
        text += line + "\n";
    });
    return text;
}
exports.arrToText = arrToText;
