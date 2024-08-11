import path = require("path");
import fs = require("fs");
import Log from "../Log/Log";
class eFileManager {
  reference: string;
  constructor() {
    this.reference = "FileSystem";
    Log.writeLog(this.reference, "File Manager enabled 🗃️");
  }
  createFile(pathfile: string, name: string, data: string = "") {
    if (fs.existsSync(path.resolve(pathfile + "/" + name))) {
      Log.writeLog(this.reference, `file: ${name} already exists in ${pathfile}`);
      return -1;
    }
    fs.writeFileSync(path.resolve(pathfile + "/" + name), data);
    console.log(`file: ${name} Created at: ${pathfile}`);
  }
  createDir(pathfile: string): number {
    if (fs.existsSync(path.resolve(pathfile))) {
      console.log(`Directory ${pathfile} already exists`);
      return -1;
    }

    fs.mkdirSync(path.resolve(pathfile));
    return 0;
  }
  writeInFile(filePath: string, content: string, rewrite: boolean = false) {
    let flag = "a+";

    if (rewrite) {
      flag = "w+";
    }
    fs.writeFile(path.resolve(filePath), content, { flag: flag }, (err) => {
      if (err) {
        Log.status = -1;
        return;
      }
    });
  }
  enableLogging() {
    Log.enableDiskWriting();
    Log.writeLog("FileSystem", "Log System Write Disk enabled ✏️");
  }
  readFileContent(pathFile: string): string {
    try {
      const data = fs.readFileSync(path.resolve(pathFile), "utf-8");

      Log.writeLog(this.reference, `${pathFile} content has been read`);
      return data;
    } catch (err) {
      Log.writeLog(this.reference, err as unknown as string);
      return "";
    }
  }
}
const FileManager = new eFileManager();

export { FileManager };
