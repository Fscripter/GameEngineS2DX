"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../FileManager/main");
const Log_1 = require("../Log/Log");
const electron_1 = require("electron");
const Settings_1 = require("../Settings/Settings");
const start_1 = require("../Startup/start");
electron_1.app.whenReady().then(() => {
    Log_1.default.writeLog("Electron", "app is ready!");
    main_1.FileManager.enableLogging();
    Settings_1.default.isSettingFile();
    start_1.default.listen();
    start_1.default.createAnimation();
});
