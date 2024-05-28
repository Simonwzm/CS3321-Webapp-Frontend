# Course-Stack 前端

## 项目介绍

这是 CS3321 数据库最终项目的子模块。该仓库充当我们的项目 Course-Stack 数据库 Web 应用程序的前端。

有关 Course-Stack 的更多信息，请参阅我们的[主要仓库](https://github.com/Simonwzm/CS3321-Course-Stack)。

前端使用vue3+vitejs进行热重载和快速开发。我们使用 [naive-ui](https://www.naiveui.com/) 作为 UI 框架，使用 [tailwind-css](https://tailwindcss.com/) 作为 post-css-processor 来实现方便但优雅的设计。

对于 vue3，我们使用 vue-router 来实现 SFA（单文件应用程序），并利用 pinia 在前端存储跨页面信息。

## 项目架构

TBD

## 本地开发环境

我们建议使用主仓库中的docker脚本启动该项目，从而得到后端的支持。然而如果希望在热插拔环境支持下尝试开发，您也可以使用下列的方法配置您的本地开发环境。 

我们建议您具有可以下载 npm 包的网络环境，您可以使用换源或者 `pmpm` 加速项目的配置过程

### 建议的IDE插件

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

### 本地项目配置

```sh
npm install
```

### 本地项目启动

```sh
npm run dev
```

### 本地项目打包部署

```sh
npm run build
```
