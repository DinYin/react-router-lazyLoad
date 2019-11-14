# react 懒加载几种方式


- react原生lazy  [react16.6以上](https://zh-hans.reactjs.org/docs/code-splitting.html#reactlazy)才支持，简单好用
- bundle-loader，安装bundle-loader来使用，简单轻便
- react-loadable，简单轻便，api丰富


## react-loadable的使用方法

###为什么要做dynamic import？
dynamic import不知道为什么有很多叫法，什么按需加载，懒加载，Code Splitting，代码分页等。
总之，就是在SPA，把JS代码分成N个页面份数的文件，不在用户刚进来就全部引入，而是等用户跳转路由的时候，再加载对应的JS文件。
这样做的好处就是加速首屏显示速度，同时也减少了资源的浪费。
- 第一步：安装 babel-plugin-syntax-dynamic-import
   `
   npm i -D babel-plugin-syntax-dynamic-import 以后， 在.babelrc文件的plungins中加上"syntax-dynamic-import"。
   `
- 第二步：安装 react-loadable
   `npm i -S react-loadable 以后，我们就能愉快得做dynamic import了`
-第三步： 可以开始写代码啦
1、index.js, 加载组件IndexPage并且 指定文件名称为IndexPage
```
import Loadable from 'react-loadable';
import MyLoadingComponent from './Loading';

const AsyncHome = Loadable({
    loader: () => import(/* webpackChunkName: "IndexPage" */'./IndexPage'),
    loading: MyLoadingComponent,
});

export default AsyncHome;
```
2、Loading.js 定义一个loading component来给一个loading状态
```
const MyLoadingComponent = ({ isLoading, error }) => {
    // Handle the loading state
    if (isLoading) {
        return <div>Loading...</div>;
    }
    // Handle the error state
    else if (error) {
        return <div>Sorry, there was a problem loading the page.</div>;
    }
    else {
        return null;
    }
};

export default MyLoadingComponent;
```
3、业务组件IndexPage，即第一步里import的组件
```
import React from 'react';
import styles from './IndexPage.css';

function IndexPage() {
  return (
    <div>
      <span className={styles.dingyin}>组件4 react-loadable</span>
    </div>
  );
}

export default IndexPage;

```
Question？
如果自定义文件名称不生效
在webpack.config.js配置chunkFilename
```
 output: {
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].js',
  },
```
##bundle-loader的使用方法
bundle-loader我也写了一个Dome在 src/routes／bundle-loader下面，具体使用细节直接看代码，使用前提，是要安装 `npm i bundle-loader --save`

###总结
- 这三个方法 原生最方便，但要求react版本在16.6以上
- 其次是react-loadable
- bundle-loader排最后

###react-loadable优化
每次使用Loadable（）时，指定相同的加载组件或延迟会很快重复。相反，您可以使用自己的高阶组件（HOC）包装Loadable以设置默认选项。
```
import Loadable from 'react-loadable';
import Loading from './my-loading-component';

export default function MyLoadable(opts) {
  return Loadable(Object.assign({
    loading: Loading,
    delay: 200,
    timeout: 10000,
  }, opts));
};
```
使用方法
```
import MyLoadable from './MyLoadable';

const LoadableMyComponent = MyLoadable({
  loader: () => import('./MyComponent'),
});

export default class App extends React.Component {
  render() {
    return <LoadableMyComponent/>;
  }
}
```