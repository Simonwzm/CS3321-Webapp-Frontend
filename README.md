# Course-Stack 前端

## 项目介绍

这是 CS3321 数据库最终项目的子模块。该仓库充当我们的项目 Course-Stack 数据库 Web 应用程序的前端。

有关 Course-Stack 的更多信息，请参阅我们的[主要仓库](https://github.com/Simonwzm/CS3321-Course-Stack)。

前端使用vue3+vitejs进行热重载和快速开发。我们使用 [naive-ui](https://www.naiveui.com/) 作为 UI 框架，使用 [tailwind-css](https://tailwindcss.com/) 作为 post-css-processor 来实现方便但优雅的设计。

对于 vue3，我们使用 vue-router 来实现 SFA（单文件应用程序），并利用 pinia 在前端存储跨页面信息。

## 项目架构

![架构图](https://s2.loli.net/2024/06/02/idScL2tUQxzTPNA.png)

前端实现中，我们总共实现了两个大功能区， 以及 6 个子页面。其中，Mainpage功能区作为网页应用的入口，负责一件搜索直达搜索功能页面+用户登录页面的职责。Workspace功能区集成了其余的5项功能，包括：图形化搜索结果页面，搜索列表页面，用户资料页面，数据库增删改查页面，以及数据库状态监视页面。用户可以使用vue router 提供的页面内路由功能，实现单页面应用带来的快捷沉浸式体验。

Mainpage和Workspace功能区的ui设计由孙州玥同学提供的详细设计稿参照完成，其余部分页面的ui设计使用naive-ui提供的ui组件从简完成。

前端逻辑使用vue框架实现，除了与数据库进行交互之外，还包含了用户系统的存储功能。为了实现跨页面的数据存储，我们利用pinia进行全局状态管理。为了实现方便起见，我们在前端进行用户的权限审查。

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
