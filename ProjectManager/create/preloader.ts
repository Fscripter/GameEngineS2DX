import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("project", {
  create: (settings: string) => {
    ipcRenderer.send("createProject", settings);
  },
  openFolder: () => {
    ipcRenderer.send("selectDirectory");
  },
});

window.addEventListener("DOMContentLoaded", () => {
  const folderText = document.getElementById("inputCarpeta") as HTMLInputElement;
  ipcRenderer.on("folderSelected", (_event, value) => {
    folderText.value = value;
  });
});
