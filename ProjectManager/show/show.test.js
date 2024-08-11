"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const main_1 = require("./main");
(0, globals_1.describe)("Show Dir Module", () => {
    (0, globals_1.test)("Print the dir", () => {
        (0, globals_1.expect)((0, main_1.showDir)("newfiles")).toMatchObject({});
    });
});
