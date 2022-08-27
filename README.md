## Done
- 使用lerna+pnpm建monorepo，熟悉pnpm
- 实现create-react-app大概流程
- 实现react-scripts的start和build命令

## lerna+pnpm初始化monorepo
- lerna init
- lerna create \<package name>
- 创建 pnpm-workspace.yaml
- 修改package.json
    - "子包": "workspace:*"  
- pnpm i
    - 最外层装 pnpm i
    - 单独装 pnpm i \<package name> --filter toy-cra

## package.json的bin字段
**用来指定各个内部命令对应的可执行文件的位置。**
```sh
"bin": {
    "toy-react-scripts": "./bin/toy-react-scripts.js"
}
```
在package.json里指定了toy-react-scripts这个命令对应的可执行文件在./bin/下，npm会找到这个文件，在node_modules/.bin下创建软连接，而node_modules/.bin在系统的PATH变量中，所以可以简写为：
```sh
"scripts": {  
  "start": "./node_modules/bin/toy-react-scripts start",  
  "---":"---简写为---"
  "build": "toy-react-scripts build"
}
```

### #!/usr/bin/env node
**让系统在PATH目录中查找node路径，来执行你的脚本文件**

## Referances
- [One For All：基于pnpm + lerna + typescript的最佳项目实践 - 理论篇](https://juejin.cn/post/7043998041786810398)
- [[译]用 PNPM Workspaces 替换 Lerna + Yarn](https://juejin.cn/post/7071992448511279141)
- [#!/usr/bin/env node 到底是什么？](https://juejin.cn/post/6844903826344902670)
- [介绍全新的 JSX 转换](https://zh-hans.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)