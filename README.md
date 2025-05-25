# 🚀 Electron + React + Vite 桌面应用模板

这是一个基于 **Electron**、**React** 和 **Vite** 构建的桌面应用程序模板。它旨在提供一个快速、高效且易于维护的开发起点，让您能够利用现代前端技术构建强大的跨平台桌面应用。

本模板着重于构建一个简洁、高效的 Electron 应用，并包含了主/渲染进程通信 (IPC) 的基本示例，以及对打包体积的考量。

## ✨ 特性

* **Electron 框架:** 强大的跨平台桌面应用能力，访问底层系统 API。
* **React 19:** 采用最新版本的 React，构建高性能、组件化的用户界面。
* **Vite 6:** 极速的开发服务器和高效的生产打包，享受卓越的开发体验。
* **TypeScript 5:** 提供强类型支持，提高代码质量和可维护性。
* **Electron Builder:** 自动化打包和分发，支持 Windows (.exe), macOS (.dmg) 和 Linux (.AppImage) 等平台。
* **IPC 通信示例:** 内置主进程与渲染进程通信 (IPC) 的基本示例，包括双向通信。
* **简洁的打包配置:** 采用了标准的 Vite 和 Electron Builder 配置，力求在功能和体积之间取得平衡。

## 📦 项目结构

```
.
├── README.md               # 项目说明 (当前文件)
├── assets/                 # **【重要】Electron Builder 构建资源和应用图标**
│                           #   * 此目录不随项目代码一同上传，需要用户自行创建并放置图标文件。
│                           #   * 示例图标文件 (根据你之前提供的tree信息，仅作参考):
│                           #     ├── icon.ico            # Windows 图标 (必须)
│                           #     ├── icon.icns           # macOS 图标 (必须)
│                           #     ├── icon.png            # Linux 图标 (必须)
│                           #     └── 其他自定义图标 (如 11icon.png, ali.ico, logo.png, tray_icon.png 等)
│                           #     └── entitlements.mac.plist (macOS 权限文件)
│                           #     └── nsis-installer.nsh (NSIS 安装脚本片段)
├── electron/               # Electron 主进程和预加载脚本
│   ├── main.cjs            # Electron 主进程入口 (Node.js 环境)
│   └── preload.cjs         # 预加载脚本，提供 IPC 通信桥梁
├── eslint.config.js        # ESLint 配置
├── index.html              # Vite 前端应用的入口 HTML 文件
├── node_modules/           # 项目依赖
├── package.json            # 项目依赖、脚本和 Electron Builder 配置
├── pnpm-lock.yaml          # pnpm 锁定文件
├── pnpm-workspace.yaml     # pnpm 工作区配置文件 (如果使用)
├── public/                 # Vite 静态资源目录
│   └── vite.svg
├── src/                    # React 应用的源代码
│   ├── App.css
│   ├── App.tsx             # 主要组件 (包含 IPC 示例)
│   ├── assets/             # 可能包含图片等静态资源
│   ├── index.css           # 全局样式文件
│   ├── main.tsx            # React 应用入口文件
│   └── vite-env.d.ts       # Vite TypeScript 环境声明
├── tsconfig.app.json       # TypeScript 应用配置
├── tsconfig.json           # TypeScript 根配置
├── tsconfig.node.json      # TypeScript Node.js (Electron 主进程) 配置
└── vite.config.ts          # Vite 配置文件
```

## 🛠️ 环境搭建

在开始之前，请确保你的开发环境已安装以下工具，**并特别注意 Node.js 和 Electron 版本的兼容性：**

* **Node.js**: **推荐使用 v22.15.1。**
    * [下载 Node.js](https://nodejs.org/en/download/)
    * **重要提示:** Node.js 和 Electron 版本之间存在严格的兼容性要求。本项目目前依赖 `electron@36.3.1`，根据经验，`node@22.15.1` 是一个稳定的搭配。如果版本不匹配，可能会在 `electron-builder` 构建或应用运行时遇到报错（例如 `Node.js native module` 编译失败）。务必确保你的 Node.js 版本与你安装的 Electron 版本兼容。
* **pnpm**: 一个快速、高效的包管理器。
    * 安装 pnpm: `npm install -g pnpm`
* **Git**: 版本控制工具。
    * [下载 Git](https://git-scm.com/downloads)

### 克隆项目

首先，将本项目克隆到你的本地：

```bash
git clone https://github.com/Edwinhei/electron-react-vite-project.git
cd electron-react-vite-project
```

### 安装依赖

进入项目目录后，使用 pnpm 安装所有依赖：

```bash
pnpm install
```
* `electron-builder install-app-deps` 会在 `postinstall` 脚本中自动运行，用于安装 Electron 相关的应用依赖。

## 🚀 开发模式

你可以在开发模式下同时运行 Electron 和 React 应用，并享受热重载。

```bash
pnpm electron:dev
```

* 此命令会启动 Vite 开发服务器 (默认为 `http://localhost:5173`)。
* 接着，Electron 应用会启动，并加载 Vite 开发服务器提供的页面。
* 当你修改 React 代码时，页面会自动刷新。

## 📦 打包与分发

当你准备好发布你的应用时，可以运行以下命令进行打包：

```bash
pnpm electron:build
```

**重要提示：**
在执行打包命令前，请务必在项目根目录下手动创建 `assets` 文件夹，并将所需的应用程序图标文件放置其中。`electron-builder` 在打包时需要这些图标文件，否则会报错导致打包失败。

**推荐图标文件 (根据 `package.json` 中的 `build` 配置):**
* `assets/icon.ico` (用于 Windows)
* `assets/icon.icns` (用于 macOS)
* `assets/icon.png` (用于 Linux)

* 此命令会先执行 `npm run build` (Vite 构建前端到 `dist` 目录)，然后调用 `electron-builder` 根据 `package.json` 中的 `build` 配置生成各平台的安装包。
* 打包完成后的可执行文件和安装包将位于 `release/` 目录下。

## ⚙️ 核心配置概览

本项目的核心配置包括：

* **`electron/main.cjs`**: Electron 主进程入口，负责窗口管理、应用生命周期和与操作系统的交互。它根据 `IS_DEV` 环境变量来决定加载 Vite 开发服务器或生产构建的 `index.html`。
* **`electron/preload.cjs`**: 预加载脚本，在渲染进程加载前执行，用于安全地向渲染进程暴露 IPC 通信接口。
* **IPC 通信**: 通过 `ipcMain.handle` 实现双向通信（如渲染进程请求数据，主进程返回），以及 `ipcMain.on` 实现异步消息发送。这些接口通过 `preload.cjs` 安全地暴露给渲染进程的 `window.electronAPI` 对象。
* **`vite.config.ts`**: Vite 的配置文件，关键在于 `base: './'` 选项，这确保了构建后的静态资源路径是相对的，从而在 Electron 的 `file://` 协议下能正确加载。
* **`package.json` 的 `build` 字段**: `electron-builder` 的配置，定义了应用的 `appId`、构建的输出目录 (`release`)、需要打包的文件 (`dist/**/*`, `electron/**/*`) 以及不同操作系统的图标和安装程序类型 (`nsis`, `dmg`, `AppImage`)。

## 📏 打包体积考量

Electron 应用的最终打包体积通常较大（数百 MB 级别），主要原因在于 Electron 捆绑了完整的 Chromium 浏览器和 Node.js 运行时。本项目已采取了以下措施来优化体积：

* **Vite 的高效打包**: Vite 相比其他一些前端构建工具，能生成更精简的 JavaScript bundle，有助于减小应用代码本身的体积。
* **`compression: "maximum"`**: 在 `electron-builder` 配置中启用了最大压缩。
* **精简依赖和资源**: `package.json` 中的 `dependencies` 保持精简，并且 `public` 目录只包含必需的资源。

## 总结

这个模板提供了一个稳健的基础，用于构建 Electron + React + Vite 桌面应用。通过上述配置和实践，你可以高效地进行开发、调试和打包。