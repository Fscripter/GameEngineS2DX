import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("project", {
  createNewProject: () => {
    ipcRenderer.send("openTabCreate");
    console.log("hi");
  },
});
