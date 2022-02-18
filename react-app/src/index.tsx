import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './redux/ConfigStore';
import Routers from './Routers';

import './index.css';

ReactDOM.render(
	<Provider store={store}>
		<Routers />
	</Provider>,
	document.getElementById('root'),
);
