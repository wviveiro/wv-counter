import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

render((
	<BrowserRouter>
		<Layout />
	</BrowserRouter>
), document.getElementById('root'));