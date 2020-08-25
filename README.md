# 小海豚坐席原型
用于UCall坐席V1.0版本详细设计，本详细设计基于[Ant Design Pro](https://pro.ant.design)，并使用js重构了pro的部分组件（原始版本使员工ts构建）。  
本项目只在开发（dev）模式可以启动mock数据服务，在打包后不具备后台功能，由于将mock数据改为静态数据的工作量也是非常繁琐且意义不大，所以暂时不考虑做纯静态项目。
## 开发环境
```bash
npm install
```
国内源在安装依赖时候可能会出现各种各样的失败（尤其是windows用户）
推荐使用`cnpm`进行代替
### 开发环境启动
```bash
npm start
```
### 构建
```bash
npm run build
```
## 服务器原型部署
由于所有物料均由umi创建，故需要采用*umi-serve*进行部署，不然将无法启动mock服务。
### 拉取源码至服务器
```bash
git clone https://github.com/bruce827/ucallDemo-frontend.git
```
### 安装依赖包
```bash
cd ucallDemo-frontend
npm install
```
### 构建项目
```bash
npm run build
```
### 安装umi-serve
推荐使用yarn进行安装，如果没有安装可以使用npm安装yarn
```bash
yarn add umi-serve
```
### 启动服务
```bash
cd dist
npm run serve
```
由于是静态页面服务，故启动会很快，待命令行出现地址后即刻可以访问。

