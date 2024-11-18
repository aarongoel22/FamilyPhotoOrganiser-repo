const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

let mainWindow;

function createMainWindow() {

    Menu.setApplicationMenu(false);

  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, "renderer", "index.js"), // Path to your renderer script
    },
  });

  mainWindow.loadFile(path.join(__dirname, "renderer", "index.html")); // Path to your HTML file

  // Optional: Open DevTools by default during development
  // mainWindow.webContents.openDevTools();
}

app.on("ready", createMainWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});
