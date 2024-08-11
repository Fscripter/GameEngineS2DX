import { FileManager } from "../FileManager/main";
import Log from "../Log/Log";
import * as minSettings from "./minSettings.json";
interface iSettings {
  editorSettings: {
    language: {
      name: string;
      short: string;
    };
    project: {
      loaded: boolean;
      path: null | string;
    };
  };
}
class SettingsLoader {
  private path: string;
  private reference: string;
  private settings!: iSettings;
  constructor() {
    this.reference = "Settings loader";
    this.path = __dirname + "/settings.json";
    Log.writeLog(this.reference, "Settings system enabled ✅");
  }
  isSettingFile() {
    if (FileManager.createFile(__dirname, "settings.json", JSON.stringify(minSettings)) == -1) {
      Log.writeLog(this.reference, "settings.json already exists");
      this.readSettingFile();
      return;
    }

    Log.writeLog(this.reference, "Settings.json have been created!");
    this.settings = minSettings;
  }
  readSettingFile() {
    this.settings = JSON.parse(FileManager.readFileContent(this.path)) as iSettings;
  }
}

const Settings = new SettingsLoader();

export default Settings;
