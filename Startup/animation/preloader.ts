import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("startup", {
  startupEnds: () => {
    ipcRenderer.send("startupEnds");
  },
});
