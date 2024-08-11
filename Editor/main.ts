import { FileManager } from "../FileManager/main";
import Log from "../Log/Log";
import { app } from "electron";
import { TabManager } from "../WindowManager/main";
import { ProjectFileManager } from "../ProjectManager/main";
import GameEditorEngine from "./editor";
import Settings from "../Settings/Settings";
import BootAnimation from "../Startup/start";

app.whenReady().then(() => {
  Log.writeLog("Electron", "app is ready!");
  FileManager.enableLogging();
  Settings.isSettingFile();
  BootAnimation.listen();
  BootAnimation.createAnimation();
});
