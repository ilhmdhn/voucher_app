const { app, BrowserWindow, Tray, ipcMain } = require('electron');
require('dotenv').config();
const path = require('path');
const port = process.env.SERVER_PORT;

const createWindow = () => {

  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    icon: __dirname + '/icon.png',
    title:"Voucher App",
    autoHideMenuBar:true
  });
  app.server = require(__dirname + '/src/index')

  const additionalData = { myKey: 'voucherapp' }
  const gotTheLock = app.requestSingleInstanceLock(additionalData)

  if(!gotTheLock){
    win.setSize(600, 400);
    win.loadFile(path.join(__dirname, '/src/views/error.html'));
    win.center();
    win.focus();
    win.show();
    win.webContents.send('error-message', 'gtw');
    // ipcMain.handle('error-message', async (event, arg) => {
    //   event.returnValue = 'Aplikasi sudah dibukaa';
    // });
    // app.quit();
  }else{
    win.loadURL(`http://localhost:${port}`);
    win.focus();
    win.center();
  
    win.on('closed', (event)=>{
      win == null;
      app.quit();
    })
  
    win.on('minimize', (event) =>{
      event.preventDefault();
      win.hide();
    });
  
    win.on('close', (event) =>{
        win == null;
        app.quit();
    })
  
  const tray = new Tray('icon.png');
    tray.on('click', ()=>{
      if(win.isVisible()){
        win.hide();
      }else{
        win.show();
      }
    })
  tray.setTitle('Self Service');
  }
}

       

app.whenReady().then(() => {
  createWindow();
});