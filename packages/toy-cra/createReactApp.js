const path = require('path')
const fs = require('fs-extra')
const chalk = require('chalk');
const commander = require('commander');
const spawn = require('cross-spawn');


const packageJson = require('./package.json');

let projectName;

async function init() {
    const program = new commander.Command(packageJson.name) // 项目名
        .version(packageJson.version)   // 版本
        .arguments('<project-directory>')   // 目录名
        .usage(`${chalk.green('<project-directory>')}`)
        .action(name => {
            projectName = name;
        }).parse(process.argv);
    await createApp(projectName)
}

async function createApp(appName) {
    let root = path.resolve(appName)   // 绝对路径
    fs.ensureDirSync(appName)
    console.log(`Creating a new React app in ${chalk.green(root)}.`);
    const packageJson = {
        appName,
        version: '0.1.0',
        private: true,
    };
    fs.writeFileSync(
        path.join(root, 'package.json'),
        JSON.stringify(packageJson, null, 2)
    );
    const origDir = process.cwd();    // 原来的工作目录
    process.chdir(root);    // 改成新建目录
    await run(root, appName, origDir)
}

async function run(root, appName, origDir) {
    let scripts = 'react-scripts'
    let template = 'cra-template'
    let verbose = true
    const allDeps = ['react', 'react-dom', scripts, template]
    console.log('Installing packages...');
    await install(root, allDeps)
    let data = [root, appName, verbose, origDir, template]
    let nodeScripts = `
    const init = require('${scripts}/scripts/init.js');
    init.apply(null, JSON.parse(process.argv[1]));
    `
    await executeNodeScript({ cwd: process.cwd() }, data, nodeScripts)
    console.log('Done.');
    process.exit(1);
}

async function install(root, deps) {
    return new Promise((resolve, reject) => {
        const command = 'yarnpkg'
        const args = ['add', '--exact', ...deps, '--cwd', root]
        const childProcess = spawn(command, args, { stdio: 'inherit' })
        childProcess.on('close', resolve)
    })
}


async function executeNodeScript({ cwd }, data, source) {
    return new Promise((resolve, reject) => {
        const child = spawn(
            process.execPath,   // 可执行文件的路径
            ['-e', source, '--', JSON.stringify(data)],
            { cwd, stdio: 'inherit' }
        );
        child.on('close', resolve);
    });
}

module.exports = {
    init
}