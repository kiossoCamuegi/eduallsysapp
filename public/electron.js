let server = require("./backend/app");
const electron = require("electron");
const app = electron.app;
const screen = electron.screen;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
let mainWindow;
let  serverWindow;  


function createWindow() {
let factor = screen.getPrimaryDisplay().scaleFactor; 

mainWindow = new BrowserWindow({
    width: 1600,
    height:900,
    icon: __dirname + '/logo-small.ico',
    webPreferences: {
      zoomFactor: 1.0 / factor
    }
});

mainWindow.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, '../build/index.html')}`);
serverWindow = new BrowserWindow({show: false});
serverWindow.loadURL("http://localhost:5000");
mainWindow.removeMenu();

mainWindow.on("closed", () => {
   mainWindow = null;
   serverWindow = null;
   server = null;
   app.quit();
 });
}

app.on("ready", createWindow);


app.on("window-all-closed", () => { 
   serverWindow = null;
   mainWindow = null;
   server = null;
   app.quit(); 
});


app.on("activate", () => {
 if(mainWindow === null){ 
    createWindow();
  }
});