"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const Log_1 = require("../Log/Log");
const main_1 = require("../WindowManager/main");
class Startup {
    constructor() {
        this.reference = "Booting system";
        Log_1.default.writeLog(this.reference, "Start up system enabled ✅");
    }
    createAnimation() {
        main_1.TabManager.createWindow({
            title: "boot",
            size: {
                width: 600,
                height: 300,
            },
            url: "Startup/animation/animation.html",
            frame: false,
            preloaderUrl: "Startup/animation/preloader.js",
        });
        Log_1.default.writeLog(this.reference, "Window created and animation started 🌈");
    }
    listen() {
        electron_1.ipcMain.on("startupEnds", () => {
            Log_1.default.writeLog(this.reference, "Animation has finished");
            this.exitAnimation();
        });
    }
    exitAnimation() {
        main_1.TabManager.getWindow("boot").close();
        main_1.TabManager.createMainWindow();
    }
}
const BootAnimation = new Startup();
exports.default = BootAnimation;
