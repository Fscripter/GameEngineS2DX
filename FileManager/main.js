"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileManager = void 0;
const path = require("path");
const fs = require("fs");
const Log_1 = require("../Log/Log");
class eFileManager {
    constructor() {
        this.reference = "FileSystem";
        Log_1.default.writeLog(this.reference, "File Manager enabled 🗃️");
    }
    createFile(pathfile, name, data = "") {
        if (fs.existsSync(path.resolve(pathfile + "/" + name))) {
            Log_1.default.writeLog(this.reference, `file: ${name} already exists in ${pathfile}`);
            return -1;
        }
        fs.writeFileSync(path.resolve(pathfile + "/" + name), data);
        console.log(`file: ${name} Created at: ${pathfile}`);
    }
    createDir(pathfile) {
        if (fs.existsSync(path.resolve(pathfile))) {
            console.log(`Directory ${pathfile} already exists`);
            return -1;
        }
        fs.mkdirSync(path.resolve(pathfile));
        return 0;
    }
    writeInFile(filePath, content, rewrite = false) {
        let flag = "a+";
        if (rewrite) {
            flag = "w+";
        }
        fs.writeFile(path.resolve(filePath), content, { flag: flag }, (err) => {
            if (err) {
                Log_1.default.status = -1;
                return;
            }
        });
    }
    enableLogging() {
        Log_1.default.enableDiskWriting();
        Log_1.default.writeLog("FileSystem", "Log System Write Disk enabled ✏️");
    }
    readFileContent(pathFile) {
        try {
            const data = fs.readFileSync(path.resolve(pathFile), "utf-8");
            Log_1.default.writeLog(this.reference, `${pathFile} content has been read`);
            return data;
        }
        catch (err) {
            Log_1.default.writeLog(this.reference, err);
            return "";
        }
    }
}
const FileManager = new eFileManager();
exports.FileManager = FileManager;
