const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')

// 保持 window 对象的全局引用，
// 避免 javascript 对象被垃圾回收时，窗口自动关闭。
let win

function createWindow() {
  // 新建窗口。
  win = new BrowserWindow({ width: 900, height: 600 })
  // 加载应用，electron-quick-start中默认的加载入口。
  // win.loadURL(url.format({
  //   pathname: path.join(__dirname, 'index.html'),
  //   protocol: 'file:',
  //   slashes: true
  // }))

  // 加载应用，适用于 react 项目。
  win.loadURL('http://localhost:3000/')

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
