"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld("project", {
    createNewProject: () => {
        electron_1.ipcRenderer.send("openTabCreate");
        console.log("hi");
    },
});
