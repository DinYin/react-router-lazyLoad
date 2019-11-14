import Loadable from 'react-loadable';
import MyLoadingComponent from './Loading';

const AsyncHome = Loadable({
    loader: () => import(/* webpackChunkName: "IndexPage" */'./IndexPage'),
    loading: MyLoadingComponent,
});

export default AsyncHome;