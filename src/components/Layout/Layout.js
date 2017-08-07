import React, {Component} from 'react';
import {Switch, Route, Link, withRouter} from 'react-router-dom';
import './Layout.css';
import Counter from '../Counter/Counter';
import NewCounter from '../NewCounter/NewCounter';
import OpenCounter from '../OpenCounter/OpenCounter';
import store from '../../stores/store';

class Layout extends Component {
	constructor(props) {
		super(props);

		store.dispatch({
			type: 'ADD_LAYOUT_OBJ',
			layout: this
		});

		this.state = store.getState();
	}
	goTo(path) {
		this.props.history.push(path);
	}
	render() {
		let linkLeft = '';
		if (this.state.layout.linkLeft !== false) {
			linkLeft = (
				<Link to={this.state.layout.linkLeft.link}>
					{this.state.layout.linkLeft.value}
				</Link>
			);
		};
		let linkRight = '';
		if (this.state.layout.linkRight !== false) {
			linkRight = (
				<Link to={this.state.layout.linkRight.link}>
					{this.state.layout.linkRight.value}
				</Link>
			);
		};

		return (
			<div className="container-layout">
				<header className="layout-header">
					<div className="row">
						<div className="col-xs-3">
							<div className="layout-link-left">
								{linkLeft}
							</div>
						</div>
						<div className="col-xs-6">
							<h1>{this.state.title}</h1>
						</div>
						<div className="col-xs-3">
							<div className="layout-link-right">
								{linkRight}
							</div>
						</div>
					</div>
				</header>
				<div className="layout-body">
					<Switch>
						<Route exact path="/" component={Counter} />
						<Route parent={this} path="/counter/new" component={NewCounter} />
						<Route parent={this} path="/counter/:id_counter" component={OpenCounter} />
					</Switch>
				</div>
			</div>
		);
	}
}

export default withRouter(Layout);