"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectFileManager = void 0;
const electron_1 = require("electron");
const main_1 = require("../WindowManager/main");
const main_2 = require("../FileManager/main");
const path = require("path");
class ProjectManager {
    constructor() {
        this.mainStructure = new Array("Assets", "Settings", "Scripts", "Assets/Media", "Assets/Fonts", "Assets/Information", "Assets/Media/Animation", "Assets/Media/Background", "Assets/Media/Effects");
        electron_1.ipcMain.on("createProject", (event, message) => {
            this.createProject(message);
        });
        electron_1.ipcMain.on("openTabCreate", () => {
            this.openTabCreate();
        });
        electron_1.ipcMain.on("selectDirectory", () => {
            let dir = electron_1.dialog.showOpenDialog(main_1.TabManager.getWindow("Create project"), {
                properties: ["openDirectory"],
            });
            dir
                .then((result) => {
                main_1.TabManager.getWindow("Create project").webContents.send("folderSelected", result.filePaths[0]);
            })
                .catch((e) => {
                console.log("Error");
            });
        });
    }
    openTabCreate() {
        main_1.TabManager.createWindow({
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
    createProject(settings) {
        this.mainStructure.forEach((directory) => {
            main_2.FileManager.createDir(settings.folder + "/" + directory);
        });
        main_2.FileManager.createFile(settings.folder + "/Settings", "settings.json", JSON.stringify(settings));
        main_1.TabManager.getWindow("Create project").close();
    }
    createAssetStorage(path) { }
    getProjectFiles(folder) { }
}
const ProjectFileManager = new ProjectManager();
exports.ProjectFileManager = ProjectFileManager;
