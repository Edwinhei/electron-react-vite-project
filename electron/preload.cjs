const { contextBridge, ipcRenderer } = require('electron')

// 使用 contextBridge 安全地暴露 API 给渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
    // 同步调用示例
    sayHello: (name) => ipcRenderer.invoke('say-hello', name),
   
    // 异步消息示例
    sendAnotherMessage: (message) => ipcRenderer.send('another-message', message),
    onReplyToAnotherMessage: (callback) => ipcRenderer.on('reply-to-another-message', (event, message) => callback(message))
    
});