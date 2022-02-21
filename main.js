// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
require('@electron/remote/main').initialize()
//comment out lines 4-11
/*app.commandLine.appendSwitch("accent");
app.commandLine.appendSwitch("title")
app.commandLine.appendSwitch("windowbar");
app.commandLine.appendSwitch("tbpos");
app.commandLine.appendSwitch("bg");
app.commandLine.appendSwitch("mode");
app.commandLine.appendSwitch("source");
app.commandLine.appendSwitch("icon");*/



const path = require('path')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    transparent:true,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      webviewTag: true,
      contextIsolation: false,
      enableRemoteModule: true,
    }
  })


  // and load the index.html of the app.
  require("@electron/remote/main").enable(mainWindow.webContents);
  mainWindow.loadFile('index.html')
  

  //require('@electron/remote/main').initialize()
  




 //detect if #min-btn is clicked
  /*mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.executeJavaScript(`
      document.getElementById("min-btn").addEventListener("click", function (e) {
        var window = remote.BrowserWindow.getAllWindows()[0];
        window.minimize();
      });
    `);
  });*/
 
  
  
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('browser-window-blur', (event, win) => {
  if (win.webContents.isDevToolsFocused()) {
    console.log('Ignore this case')
  } else {
    console.log('browser-window-blur', win.webContents.id);
  }
})
app.whenReady().then(() => {
  
  createWindow()
  
  app.on('activate', function () {
    
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
    
//Use the following arguments to configure the web app handler: --accent="#ff3d00" --title="Application" --windowbar="#EEEEEE" --tbPos="bottom" --bg="#ffffff" --mode="light" --source="https://localhost:1776/apps/welcome" --icon="/usr/share/icons/welcome.png"


  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
 
      