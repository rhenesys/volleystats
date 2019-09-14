const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow} = electron;

let mainWindow;

// Listen for app to be ready
app.on('ready', function(){
    //Create new window
    mainWindow = new BrowserWindow({
        show: false,
        webPreferences: {nodeIntegration: true},
        width: 600,
        height: 800,
        frame: true
    });

    mainWindow.once('ready-to-show',()=>{
        mainWindow.show();
    })
    //Load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
});