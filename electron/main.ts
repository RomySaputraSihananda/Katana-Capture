import { ipcMain, app, BrowserWindow, dialog } from "electron";
// const {  } = require("electron");

import path from "node:path";
const ffmpeg = require("fluent-ffmpeg");

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

let win: BrowserWindow;
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

function createWindow() {
  win = new BrowserWindow({
    width: 1024,
    height: 728,
    resizable: false,
    icon: path.join(process.env.VITE_PUBLIC, "cap.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, "index.html"));
  }

  win.webContents.openDevTools();
}

ipcMain.handle("gasConvert", async (e, inputDir) => {
  const name: string | undefined = /\/([^/]+)\.mp4$/.exec(inputDir)?.pop();

  const outputDir = await dialog
    .showOpenDialog({
      properties: ["openDirectory"],
    })
    .then((dir) => {
      if (dir.canceled) return null;
      return dir.filePaths[0];
    });

  if (!outputDir)
    return dialog.showMessageBox({
      type: "warning",
      message: "Select the directory for the image output",
      buttons: ["OK"],
    });

  ffmpeg(inputDir)
    .outputOptions(["-f", "image2"])
    .on("end", () => {
      console.log("Video frames extracted successfully");
    })
    .on("error", (error: any) => {
      console.error("Error extracting video frames:", error);
    })
    .save(path.join(outputDir, `${name}_%05d.png`));
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(createWindow);
