"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabManager = void 0;
const electron_1 = require("electron");
const path = require("path");
const main_1 = require("../ProjectManager/main");
const Log_1 = require("../Log/Log");
class WindowManager {
    constructor() {
        this.reference = "Tab System";
        this.windows = new Map();
        this.templateMainMenu = new Array({
            label: "Project",
            submenu: [
                {
                    label: "New Project",
                    click: () => {
                        console.log("Opening new project...");
                        main_1.ProjectFileManager.openTabCreate();
                    },
                },
                { label: "Open Existing Project" },
                { label: "Save Current Project" },
                { label: "Close Project" },
                { type: "separator" }, // Separador entre las opciones principales y las adicionales
                {
                    label: "Project Settings",
                    click: () => {
                        console.log("Opening project settings...");
                        // Agrega la lógica para abrir la configuración del proyecto aquí
                    },
                },
                {
                    label: "Export Project",
                    click: () => {
                        console.log("Exporting project...");
                        // Agrega la lógica para exportar el proyecto aquí
                    },
                },
                { type: "separator" },
                {
                    label: "Recent Projects",
                    submenu: [{ label: "Project A" }, { label: "Project B" }, { label: "Project C" }],
                },
            ],
        }, {
            label: "Edit",
            submenu: [
                {
                    label: "Reload Window",
                    accelerator: "CmdOrCtrl+R",
                    click: () => {
                        this.mainWindow.reload();
                    },
                },
            ],
        }, {
            label: "Object",
            submenu: [
                { label: "Create Empty Object" },
                { label: "Create Object from Template" },
                { type: "separator" },
                { label: "Open Object Editor" },
                { label: "Add Static Images" },
                { label: "Add Spritesheet" },
                { label: "Add 3D Model" },
                { label: "Import Object Assets" },
            ],
        }, {
            label: "Animation",
            submenu: [
                { label: "Create New Animation" },
                { label: "Open Animation" },
                { label: "Save Animation" },
                { type: "separator" },
                { label: "Export Animation as GIF" },
            ],
        }, { label: "Audio", submenu: [{ label: "Manage Audio Files" }] }, { label: "Camera", submenu: [{ label: "Adjust Camera Settings" }] }, { label: "Documentation", submenu: [{ label: "Open Documentation" }] }, {
            label: "Help",
            submenu: [
                { label: "Check for Updates" },
                { label: "Report Issue or Bug" },
                { type: "separator" },
                { label: "Visit Online Forum" },
            ],
        }, { label: "About" });
        electron_1.app.whenReady().then(() => {
            console.log("Electron initialized");
        });
    }
    createMainWindow() {
        this.mainWindow = new electron_1.BrowserWindow({
            width: 1000,
            height: 500,
            resizable: true,
            icon: path.resolve(__dirname + "/../Assets/Logo/logo-white.png"),
            webPreferences: {
                preload: path.resolve(__dirname + "/preloader.js"),
            },
        });
        this.mainWindow.setMenu(electron_1.Menu.buildFromTemplate(this.templateMainMenu));
        this.mainWindow.loadFile(path.resolve(__dirname + "/example.html"));
        this.mainWindow.maximize();
        Log_1.default.writeLog(this.reference, "Main Window created 🎮");
    }
    createWindow(windowSettings) {
        var _a;
        let window = new electron_1.BrowserWindow({
            width: windowSettings.size.width,
            height: windowSettings.size.height,
            title: windowSettings.title,
            webPreferences: {
                preload: path.resolve(__dirname + "/../" + windowSettings.preloaderUrl),
            },
            frame: windowSettings.frame,
        });
        this.windows.set(windowSettings.title, window);
        let url = path.resolve(__dirname + "/example.html");
        if (windowSettings.url)
            url = windowSettings.url;
        (_a = this.windows.get(windowSettings.title)) === null || _a === void 0 ? void 0 : _a.loadFile(url);
    }
    getWindow(title) {
        return this.windows.get(title);
    }
}
const TabManager = new WindowManager();
exports.TabManager = TabManager;
