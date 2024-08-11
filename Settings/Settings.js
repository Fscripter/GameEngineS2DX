"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../FileManager/main");
const Log_1 = require("../Log/Log");
const minSettings = require("./minSettings.json");
class SettingsLoader {
    constructor() {
        this.reference = "Settings loader";
        this.path = __dirname + "/settings.json";
        Log_1.default.writeLog(this.reference, "Settings system enabled ✅");
    }
    isSettingFile() {
        if (main_1.FileManager.createFile(__dirname, "settings.json", JSON.stringify(minSettings)) == -1) {
            Log_1.default.writeLog(this.reference, "settings.json already exists");
            this.readSettingFile();
            return;
        }
        Log_1.default.writeLog(this.reference, "Settings.json have been created!");
        this.settings = minSettings;
    }
    readSettingFile() {
        this.settings = JSON.parse(main_1.FileManager.readFileContent(this.path));
    }
}
const Settings = new SettingsLoader();
exports.default = Settings;
