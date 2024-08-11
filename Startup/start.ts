import { ipcMain } from "electron";
import Log from "../Log/Log";
import { TabManager } from "../WindowManager/main";

class Startup {
  reference: string;
  constructor() {
    this.reference = "Booting system";
    Log.writeLog(this.reference, "Start up system enabled ✅");
  }
  createAnimation() {
    TabManager.createWindow({
      title: "boot",
      size: {
        width: 600,
        height: 300,
      },
      url: "Startup/animation/animation.html",
      frame: false,
      preloaderUrl: "Startup/animation/preloader.js",
    });
    Log.writeLog(this.reference, "Window created and animation started 🌈");
  }
  listen() {
    ipcMain.on("startupEnds", () => {
      Log.writeLog(this.reference, "Animation has finished");
      this.exitAnimation();
    });
  }
  exitAnimation() {
    TabManager.getWindow("boot").close();
    TabManager.createMainWindow();
  }
}

const BootAnimation = new Startup();

export default BootAnimation;
