const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')

// 保持 window 对象的全局引用，
// 避免 javascript 对象被垃圾回收时，窗口自动关闭。
let win

function createWindow() {
  // 新建窗口。
  win = new BrowserWindow({ width: 900, height: 600 })
  // homepage
  // 默认情况下，homepage 是 http://localhost:3000，build 后，
  // 所有资源文件路径都是 /static，而 Electron 调用的入口是 file :协议，
  // /static 就会定位到根目录去，所以找不到静态文件。在 package.json 文件中添加 homepage 字段并设置为"."后，
  // 静态文件的路径就变成了相对路径，就能正确地找到了。

  // 打包时，加载应用，electron-quick-start中默认的加载入口。
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // 加载应用，适用于 react 项目未打包时。
  // win.loadURL('http://localhost:3000/')

  // 打开开发者工具，默认不打开。
  win.webContents.openDevTools()

	// 当 window 被关闭，这个事件会被触发。
	win.on('closed', () => {
		// 取消引用 window 对象，如果你的应用支持多窗口的话，
		// 通常会把多个 window 对象放在一个数组里面，
		// 与此同时，你应该删除相应的元素。
		win = null
	})
}

// 当 electron 完成初始化并准备创建窗口时。
app.on('ready', createWindow)

// 所有窗口关闭时，退出应用。
app.on('window-all-closed', function () {
  // macOS 中除非用户按下 cmd + q 显示退出，
  // 否则应用与菜单栏始终处于活动状态。
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// 应用激活时。
app.on('activate', () => {
	// 在 macOS 上，当单击 dock 图标并且没有其他窗口打开时，
	// 通常在应用程序中重新创建一个窗口。
	if (win === null) {
		createWindow()
	}
})
