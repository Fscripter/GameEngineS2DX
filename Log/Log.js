"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../FileManager/main");
const date_1 = require("../tools/date");
const text_1 = require("../tools/text");
class LogSystem {
    constructor() {
        this.status = 0; // 0 Cannot write in disk, 1 Can write
        this.isDiskAvailable = false;
        this.logMsg = [];
        // this.path = __dirname + "/logs/log" + getDateSpecial() + ".txt";
        this.path = __dirname + "/log.txt";
        console.log(this.path);
        this.writeLog("Log", "Log System enabled");
    }
    getStatus() {
        return this.status;
    }
    writeLog(system, msg) {
        let logtemp = `${(0, text_1.centerText)((0, date_1.getDateNow)(), 20)} | ${(0, text_1.centerText)(system, 20)} | ${msg}`;
        this.logMsg.push(logtemp);
        this.writeInDisk();
    }
    writeInDisk() {
        if (this.isDiskAvailable == false)
            return;
        main_1.FileManager.writeInFile(this.path, (0, text_1.arrToText)(this.logMsg));
        this.clearLogBuffer();
    }
    enableDiskWriting() {
        this.isDiskAvailable = true;
        this.status = 1;
        this.clearLogFile();
    }
    clearLogBuffer() {
        this.logMsg = [];
    }
    clearLogFile() {
        main_1.FileManager.writeInFile(this.path, "", true);
    }
}
const Log = new LogSystem();
exports.default = Log;
