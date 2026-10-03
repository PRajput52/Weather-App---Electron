// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('node:path')

function createWindow () {
  // Create the browser window sized exactly for header + weather container
  const mainWindow = new BrowserWindow({
    width: 400,          // match header/container width
    height: 460,         // header (72) + container (388)
    resizable: false,    // prevent resizing
    autoHideMenuBar: true, // hide File/Edit/View menu bar
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open DevTools if you need debugging:
  // mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
