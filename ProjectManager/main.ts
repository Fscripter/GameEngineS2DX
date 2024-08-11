import { OpenDialogReturnValue, dialog, ipcMain, webContents } from "electron";
import { TabManager } from "../WindowManager/main";
import { existsSync, mkdir, mkdirSync } from "fs";
import { FileManager } from "../FileManager/main";
const path = require("path");

interface iSettings {
  title: string;
  version: string;
  date: Date;
  folder: string;
}

class ProjectManager {
  mainStructure: Array<string>;
  constructor() {
    this.mainStructure = new Array<string>(
      "Assets",
      "Settings",
      "Scripts",
      "Assets/Media",
      "Assets/Fonts",
      "Assets/Information",
      "Assets/Media/Animation",
      "Assets/Media/Background",
      "Assets/Media/Effects"
    );
    ipcMain.on("createProject", (event, message) => {
      this.createProject(message);
    });
    ipcMain.on("openTabCreate", () => {
      this.openTabCreate();
    });
    ipcMain.on("selectDirectory", () => {
      let dir = dialog.showOpenDialog(TabManager.getWindow("Create project"), {
        properties: ["openDirectory"],
      });
      dir
        .then((result: OpenDialogReturnValue) => {
          TabManager.getWindow("Create project").webContents.send(
            "folderSelected",
            result.filePaths[0]
          );
        })
        .catch((e) => {
          console.log("Error");
        });
    });
  }
  openTabCreate() {
    TabManager.createWindow({
      title: "Create project",
      size: {
        width: 1000,
        height: 500,
      },
      url: "ProjectManager/create/create.html",
      frame: true,
      preloaderUrl: "ProjectManager/create/preloader.js",
    });
  }
  createProject(settings: iSettings) {
    this.mainStructure.forEach((directory) => {
      FileManager.createDir(settings.folder + "/" + directory);
    });

    FileManager.createFile(
      settings.folder + "/Settings",
      "settings.json",
      JSON.stringify(settings)
    );
    TabManager.getWindow("Create project").close();
  }
  createAssetStorage(path: string) {}
  getProjectFiles(folder: string) {}
}

const ProjectFileManager = new ProjectManager();
export { ProjectFileManager };
