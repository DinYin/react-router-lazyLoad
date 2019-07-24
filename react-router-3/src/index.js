import dva from 'dva';
import './index.css';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));
// app.router(require('./routerLazy'));


// 5. Start
app.start('#root');
