const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { PythonShell } = require("python-shell");

var known = [];
var unknown = [];
var name = "";

if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    titleBarStyle: "hidden",
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });
  mainWindow.setMenu(null);
  mainWindow.loadFile(path.join(__dirname, "knownFaces.html"));
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on("known", (event, arg) => {
  console.log("k", arg);
  known = arg;
});

ipcMain.on("unknown", (event, arg) => {
  console.log("uk", arg);
  unknown = arg;
});

ipcMain.on("name", (event, arg) => {
  console.log("n", arg);
  name = arg;
});

ipcMain.on("start-python", (event, arg) => {
  var arguments = new Array();

  arguments.push(name);

  for (let i = 0; i < known.length; i++) {
    arguments.push(known[i]);
  }

  arguments.push("SEPARATION");

  for (let i = 0; i < unknown.length; i++) {
    arguments.push(unknown[i]);
  }

  var options = {
    pythonOptions: ["-u"],
    scriptPath: path.join(__dirname, "."),
    args: arguments,
  };

  //Function qui retoure true si le premier mot est "Dans" et false sinon.
  const cutString = (str) => {
    const modified = String(str).split(", ")
    return modified
  }

  PythonShell.run("main.py", options, (err, res) => {
    if (err) throw err;
    const a = cutString(res)
    event.reply("logs", a)
  });
});
