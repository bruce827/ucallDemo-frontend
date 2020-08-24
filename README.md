# 小海豚坐席原型

用于UCall坐席V1.0版本详细设计，本详细设计基于[Ant Design Pro](https://pro.ant.design)，并使用js重构了pro的部分组件（原始版本使员工ts构建）。  
本项目只在开发（dev）模式可以启动mock数据服务，在打包后不具备后台功能，由于将mock数据改为静态数据的工作量也是非常繁琐且意义不大，所以暂时不考虑做纯静态项目。

## Environment Prepare
## 开发环境

Install `node_modules`:

```bash
npm install
```

or

```bash
yarn
```

## Provided Scripts

Ant Design Pro provides some useful script to help you quick start and build with web project, code style check and test.

Scripts provided in `package.json`. It's safe to modify or add additional script:

### Start project

```bash
npm start
```

### Build project

```bash
npm run build
```

### Check code style

```bash
npm run lint
```

You can also use script to auto fix some lint error:

```bash
npm run lint:fix
```

### Test code

```bash
npm test
```

## More

You can view full document on our [official website](https://pro.ant.design). And welcome any feedback in our [github](https://github.com/ant-design/ant-design-pro).
