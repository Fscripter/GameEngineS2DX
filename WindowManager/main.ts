import { app, BrowserWindow, Menu } from "electron";
import path = require("path");
import { ProjectFileManager } from "../ProjectManager/main";
import Log from "../Log/Log";

interface iSize {
  width: number;
  height: number;
}

interface eWindow {
  title: string;
  size: iSize;
  url?: string;
  preloaderUrl?: string | undefined;
  frame?: boolean | false;
}

class WindowManager {
  mainWindow!: BrowserWindow;
  windows!: Map<string, BrowserWindow>;
  templateMainMenu: Array<{}>;
  reference: string;
  constructor() {
    this.reference = "Tab System";
    this.windows = new Map<string, BrowserWindow>();
    this.templateMainMenu = new Array<{}>(
      {
        label: "Project",
        submenu: [
          {
            label: "New Project",
            click: () => {
              console.log("Opening new project...");
              ProjectFileManager.openTabCreate();
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
      },
      {
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
      },
      {
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
      },
      {
        label: "Animation",
        submenu: [
          { label: "Create New Animation" },
          { label: "Open Animation" },
          { label: "Save Animation" },
          { type: "separator" },
          { label: "Export Animation as GIF" },
        ],
      },
      { label: "Audio", submenu: [{ label: "Manage Audio Files" }] },
      { label: "Camera", submenu: [{ label: "Adjust Camera Settings" }] },
      { label: "Documentation", submenu: [{ label: "Open Documentation" }] },
      {
        label: "Help",
        submenu: [
          { label: "Check for Updates" },
          { label: "Report Issue or Bug" },
          { type: "separator" },
          { label: "Visit Online Forum" },
        ],
      },
      { label: "About" }
    );
    app.whenReady().then(() => {
      console.log("Electron initialized");
    });
  }
  createMainWindow() {
    this.mainWindow = new BrowserWindow({
      width: 1000,
      height: 500,
      resizable: true,
      icon: path.resolve(__dirname + "/../Assets/Logo/logo-white.png"),
      webPreferences: {
        preload: path.resolve(__dirname + "/preloader.js"),
      },
    });
    this.mainWindow.setMenu(Menu.buildFromTemplate(this.templateMainMenu));
    this.mainWindow.loadFile(path.resolve(__dirname + "/example.html"));
    this.mainWindow.maximize();

    Log.writeLog(this.reference, "Main Window created 🎮");
  }
  createWindow(windowSettings: eWindow) {
    let window = new BrowserWindow({
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
    if (windowSettings.url) url = windowSettings.url;
    this.windows.get(windowSettings.title)?.loadFile(url);
  }
  getWindow(title: string): BrowserWindow {
    return this.windows.get(title)!;
  }
}

const TabManager = new WindowManager();
export { TabManager };
