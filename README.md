
# react-router-lazyLoad
    在蚂蚁金福的 dva+antd的模式下，我们可以快速开发出一个单页面应用网站。但是当网站规模越来越大的时候，首先出现的问题是 
    唯一的Javascript 文件变得巨大，这导致首页渲染的时间让人难以忍受。
    实际上程序应当只加载当前渲染页所需的 JavaScript，也就是大家说的“代码分拆" — 将所有的代码分拆成多个小包，在用户浏览过程
    中按需加载。
   利用react-router进行代码分割，实现懒加载。在router4以前，我们是使用getComponent的的方式来实现按需加载的，
   router4中，getComponent方法已经被移除。

  （1）router3代码拆分很简单：以下写法就可以了，注意 getComponent es6写法需要加default。

    const IndexPage = (location, cb) => {
        require.ensure([], require => {
            cb(null, require('./routes/IndexPage'))
        },'IndexPage')
    }
    
  （2）router4按需加载方式（分三步）

    第一步：创建Bundle.js文件,这个文件其实是个通过bundle-loader包装后的组件来使用。
    第二步：利用bundle-loader引入文件。

    import aContainer from 'bundle-loader?lazy!./IndexPage';
    import Bundle from './Bundle';
    const A = (props) => (
    <Bundle load={aContainer}>
        {(Container) => <Container {...props}/>}
    </Bundle>
    )
    export default A;

    第三步：路由配置。
     <Route path="/" exact component={OneContainer} />
