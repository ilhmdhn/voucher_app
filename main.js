const { app, BrowserWindow, Tray } = require('electron');
const logger = require('./src/util/logger');
require('dotenv').config();
const port = process.env.SERVER_PORT;

function createWindow () {
    app.server = require(__dirname+'/src/index.js', (error)=>{
      if(err){
        logger.error(`Fail to open /src/index.js`);
      }
    });  
    const win = new BrowserWindow({
      width: 1280,
      height: 720,
      icon:__dirname + '/icon.png',
      title:"Voucher App"
    });

    win.webContents.session.clearStorageData();
    win.webContents.session.clearCache(() =>{
      console.log("clear cache");
    })
  
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

  app.setUserTasks([
    {
      program: process.execPath,
      arguments: '--new-window',
      iconPath: process.execPath,
      iconIndex: 0,
      title: 'Voucher',
      description: 'Create a new window'
    }
  ])

app.whenReady().then(() => {
  createWindow();
  setUserTasks();
});