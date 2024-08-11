import { FileManager } from "../FileManager/main";
import { getDateNow, getDateSpecial } from "../tools/date";
import { arrToText, centerText } from "../tools/text";

class LogSystem {
  status: number;
  isDiskAvailable: boolean;
  logMsg: Array<string>;
  private path: string;
  constructor() {
    this.status = 0; // 0 Cannot write in disk, 1 Can write
    this.isDiskAvailable = false;
    this.logMsg = [];
    // this.path = __dirname + "/logs/log" + getDateSpecial() + ".txt";
    this.path = __dirname + "/log.txt";

    console.log(this.path);

    this.writeLog("Log", "Log System enabled");
  }
  getStatus(): number {
    return this.status;
  }
  writeLog(system: string, msg: string) {
    let logtemp = `${centerText(getDateNow(), 20)} | ${centerText(system, 20)} | ${msg}`;
    this.logMsg.push(logtemp);

    this.writeInDisk();
  }
  writeInDisk() {
    if (this.isDiskAvailable == false) return;

    FileManager.writeInFile(this.path, arrToText(this.logMsg));
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
    FileManager.writeInFile(this.path, "", true);
  }
}

const Log = new LogSystem();
export default Log;
