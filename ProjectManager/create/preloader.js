"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld("project", {
    create: (settings) => {
        electron_1.ipcRenderer.send("createProject", settings);
    },
    openFolder: () => {
        electron_1.ipcRenderer.send("selectDirectory");
    },
});
window.addEventListener("DOMContentLoaded", () => {
    const folderText = document.getElementById("inputCarpeta");
    electron_1.ipcRenderer.on("folderSelected", (_event, value) => {
        folderText.value = value;
    });
});
