const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// 判断是否是开发模式
const isDev = process.env.IS_DEV === 'true';

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        webPreferences: {
            // 预加载脚本的路径
            preload: path.join(__dirname, 'preload.cjs'),
            // 启用上下文隔离，这是 Electron 推荐的安全实践
            contextIsolation: true,
            // 禁用 Node.js 集成，因为我们通过 preload 脚本安全地暴露 API
            nodeIntegration: false,
            // 如果你的 vite dev server 运行在不同的端口，可能需要设置 webSecurity 为 false
            // 但通常不推荐在生产环境中使用，生产环境 webSecurity 应该保持 true
            webSecurity: !isDev,
        }
    });

    if (isDev) {
        // 开发模式：加载 Vite 开发服务器
        mainWindow.loadURL('http://localhost:5173'); // Vite 默认端口
        // 打开开发者工具
        mainWindow.webContents.openDevTools();
    }else{
        // 生产模式：加载打包后的 React 应用
        mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
    }

    // 监听窗口关闭事件
    mainWindow.on('closed', ()=>{
        mainWindow = null;
    });
}

app.whenReady().then(()=>{
    createWindow();

    app.on('activate', ()=>{
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

// --- IPC 通信示例 ---
ipcMain.handle('say-hello', async (event, name)=>{
    console.log(`主进程收到来自渲染进程的消息: Hello, ${name}!`);
    return `Electron 主进程回复: 你好，${name}！`;
});

ipcMain.on('another-message', (event, arg)=>{
    console.log('渲染进程发送的异步消息:', arg);
    event.sender.send('reply-to-another-message', '主进程已收到异步消息！')
})