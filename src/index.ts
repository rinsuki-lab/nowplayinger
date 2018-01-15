import { app, Tray, BrowserWindow } from "electron"
import * as menubar from "menubar"
import { join } from "path";

const mb = menubar({
    dir: __dirname,
    index: "file://" + join(__dirname, "client", "index.html"),
    width: 320,
    minWidth: 320,
    maxWidth: 360,
    height: 450,
    hasShadow: true,
    resizable: true,
    transparent: true,
})

app.on("ready", () => {
    var window = new BrowserWindow()
    window.loadURL("file://"+join(__dirname, "client", "index.html"))
    window.show()
    window.webContents.openDevTools()
})