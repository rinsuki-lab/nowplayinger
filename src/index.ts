import { app, Tray, BrowserWindow } from "electron"
import * as menubar from "menubar"
import { join } from "path";

const mb = menubar({
    dir: __dirname,
    index: "file://" + join(__dirname, "client", "index.html"),
    width: 320,
    height: 350,
    hasShadow: true,
    resizable: false,
    transparent: true,
})

app.on("ready", () => {
    var window = new BrowserWindow()
    window.loadURL("file://"+join(__dirname, "client", "index.html"))
    window.show()
    window.webContents.openDevTools()
})