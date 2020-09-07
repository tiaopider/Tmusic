# tmusic项目如何运行

## 一、安装node.js
- 进入node.js官网 https://nodejs.org/en/download/, 选择安装包进行下载安装。
- 安装完成后，打开命令窗口（window系统键盘按【Win+R】键，输入cmd回车打开命令窗口）
- 输入node -v 和 npm -v 可以分别查看对应的版本号，显示对应版本号表示下载安装成功
```
C:\Users\w-w_w>node -v
v12.18.1

C:\Users\w-w_w>npm -v
6.14.5

```

## 二、安装vue vue-cli脚手架
- 安装vue。
```
npm install vue
```
- 全局安装vue-cli:
```
npm install --global vue-cli
```
- 检查是否安装成功，显示对应版本号表示安装成功
```
C:\Users\w-w_w>vue -V
@vue/cli 4.4.6
```

## 三、本地运行项目
- 在项目目录下打开命令窗口
- 输入npm run serve
```
  App running at:
  - Local:   http://localhost:8080/
  - Network: http://192.168.43.175:8080/

  Note that the development build is not optimized.
  To create a production build, run npm run build.
```
- 在浏览器中输入网址http://localhost:8080即可看到项目
