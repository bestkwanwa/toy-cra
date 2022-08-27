const path = require('path')

const appDir = process.cwd()  // 当前工作目录

const resolveApp = relativePath => path.resolve(appDir, relativePath)

module.exports = {
  /** 打包输出目录 */
  appBuild: resolveApp('build'),
  /** html模板 */
  appHtml: resolveApp('public/index.html'),
  /** 入口文件 */
  appIndexJs: resolveApp('src/index.js'),
  /** 静态资源目录 */
  appPublic: resolveApp('public'),
  /** 代码目录 */
  appSrc: resolveApp('src'),
}