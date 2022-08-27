
process.env.NODE_ENV = 'production'

const configFactory = require('../config/webpack.config')
const config = configFactory('production')

const fs = require('fs-extra');
const paths = require('../config/paths');

fs.emptyDirSync(paths.appBuild);

copyPublicFolder();

build()

function copyPublicFolder() {
    fs.copySync(paths.appPublic, paths.appBuild, {
        filter: file => file !== paths.appHtml,
    });
}

function build() {
    const webpack = require('webpack')
    const chalk = require('chalk')
    const compiler = webpack(config);
    compiler.run((err, stats) => {
        console.log(chalk.green('Compile successfully!'));
    })

}