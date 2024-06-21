// main.js
const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

async function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  const contextMenu = await import('electron-context-menu');

  contextMenu.default({
    window: win,
    showSaveImageAs: true,
    showCopyImageAddress: true,
    showCopyLink: true,
    showInspectElement: false, // Disable Inspect Element
  });

  // Remove the default menu
  Menu.setApplicationMenu(null);

  win.loadURL('https://chat.openai.com/');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
