import { useState, useEffect } from 'react'; // <--- 移除 React 的默认导入
import './App.css'; // 假设你的 App.css 也在 src 目录下

function App() {
  const [response, setResponse] = useState('');
  const [asyncResponse, setAsyncResponse] = useState('');

  // 监听主进程的异步回复
  useEffect(() => {
    // 确保 window.electronAPI 存在
    if (window.electronAPI) {
      window.electronAPI.onReplyToAnotherMessage((message: string) => {
        setAsyncResponse(message);
      });
    }
    // 清理事件监听器
    return () => {
        if (window.electronAPI) {
            window.electronAPI.onReplyToAnotherMessage(() => {}); // 移除监听器（简单示例，实际应传入具体函数引用）
        }
    };
  }, []);

  const handleSayHello = async () => {
    if (window.electronAPI) {
      const res = await window.electronAPI.sayHello('React 应用');
      setResponse(res);
    } else {
      setResponse('Electron API 未加载，可能不在 Electron 环境中。');
    }
  };

  const handleSendAsyncMessage = () => {
    if (window.electronAPI) {
      window.electronAPI.sendAnotherMessage('这是一个来自 React 应用的异步消息！');
      setAsyncResponse('发送中...');
    } else {
      setAsyncResponse('Electron API 未加载。');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Electron + React + Vite</h1>
        <p>这是你的桌面应用！</p>
        <div>
          <button onClick={handleSayHello}>调用主进程同步方法</button>
          <p>主进程回复: {response}</p>
        </div>
        <div style={{ marginTop: '20px' }}>
          <button onClick={handleSendAsyncMessage}>发送主进程异步消息</button>
          <p>主进程回复 (异步): {asyncResponse}</p>
        </div>
      </header>
    </div>
  );
}

export default App;