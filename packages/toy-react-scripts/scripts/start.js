
process.env.NODE_ENV = 'development'

const configFactory = require('../config/webpack.config')
const config = configFactory('development')

const createDevServerConfig = require('../config/webpackDevServer.config')
const serverConfig = createDevServerConfig()

start()

async function start() {
    const webpack = require('webpack')
    const chalk = require('chalk')
    const compiler = webpack(config);
    const Server = require('webpack-dev-server')
    const server = new Server(serverConfig, compiler)

    await server.start();

    console.log(chalk.cyan(`Running on http://localhost:${serverConfig.port}`));
}
