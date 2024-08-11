import Store = require("electron-store");
import { TabManager } from "../WindowManager/main";
import { ProjectFileManager } from "../ProjectManager/main";

const store = new Store();

class GameEditor {
  private _isProjectLoaded!: Boolean;
  constructor() {}
  startup() {
    this.checkSettings();
    this.getProjectStatus();
  }
  checkSettings() {
    this._isProjectLoaded =
      store.get("loadedProject") == undefined ? false : (store.get("loadedProject") as boolean);

    console.log(this._isProjectLoaded);
  }
  getProjectStatus() {
    if (this._isProjectLoaded == true) {
      TabManager.createMainWindow();
      return;
    }
    TabManager.createMainWindow();
    ProjectFileManager.openTabCreate();
  }
}

const GameEditorEngine = new GameEditor();

export default GameEditorEngine;
