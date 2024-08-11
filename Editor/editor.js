"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Store = require("electron-store");
const main_1 = require("../WindowManager/main");
const main_2 = require("../ProjectManager/main");
const store = new Store();
class GameEditor {
    constructor() { }
    startup() {
        this.checkSettings();
        this.getProjectStatus();
    }
    checkSettings() {
        this._isProjectLoaded =
            store.get("loadedProject") == undefined ? false : store.get("loadedProject");
        console.log(this._isProjectLoaded);
    }
    getProjectStatus() {
        if (this._isProjectLoaded == true) {
            main_1.TabManager.createMainWindow();
            return;
        }
        main_1.TabManager.createMainWindow();
        main_2.ProjectFileManager.openTabCreate();
    }
}
const GameEditorEngine = new GameEditor();
exports.default = GameEditorEngine;
