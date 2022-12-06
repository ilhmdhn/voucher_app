const { app, BrowserWindow, Tray } = require('electron');
require('dotenv').config();
const port = process.env.SERVER_PORT;

const createWindow = () => {

  app.server = require(__dirname + '/src/index')

  const additionalData = { myKey: 'myValue' }
  const gotTheLock = app.requestSingleInstanceLock(additionalData)
  console.log('single', gotTheLock)

  if(!single){
    process.exit(1);
    app.quit();
    return
  }else{
    const win = new BrowserWindow({
      width: 1280,
      height: 720,
      icon: __dirname + '/icon.png',
      title:"Voucher App"
    });
    win.loadURL(`http://localhost:${port}`);
    win.focus();
    win.center();
    win.setMenu(null);
  
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