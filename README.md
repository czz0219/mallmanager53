# mallmanager53

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

git config --global user.name "成小明"
git config --global user.email "1908388450@qq.com"


Git 全局设置:

git config --global user.name "成小明"
git config --global user.email "1908388450@qq.com"

创建 git 仓库:

mkdir mallmanager53
cd mallmanager53
git init    初始化git本地仓库
git status     查看本地目录文件状态
touch README.md     创建本地源码
git add README.md   添加所有本地文件到git本地仓库
git commit -m "first commit"    提交git add 的添加
git remote add origin https://gitee.com/czz_cloud/mallmanager53.git     关联本地仓库和代码托管平台的代码仓库
git push -u origin master   推送本地仓库的更新到远程代码托管平台。

7\  git remote rm origin  git@github.com:czz0219/mallmanager53.git 删除远程关联仓库
8\  git remote -v 查看操作的远程仓库历史地址

如果没有 公钥 ：1 托管平台需要创建 SSH keys
                2   本地仓库管理目录 生成RSA密钥    ssh-keygen -t rsa -b 4096 -C "1908388450@qq.com"
                3 托管平台完成创建.


