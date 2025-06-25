import { app, BrowserWindow } from 'electron'
import path from 'path'
import { fileURLToPath } from 'url'
import { existsSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  })

  const indexPath = path.join(__dirname, '../dist/index.html')
  
  // ตรวจสอบว่าไฟล์มีอยู่จริงหรือไม่
  if (existsSync(indexPath)) {
    win.loadFile(indexPath)
  } else {
    console.error('File not found:', indexPath)
    console.log('Please run "npm run build" first')
    app.quit()
  }
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})