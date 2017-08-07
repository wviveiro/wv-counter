import React, {Component} from 'react';
import './Counter.css';
import store from '../../stores/store';

class Counter extends Component {
	componentDidMount() {
		store.dispatch({
			type: 'CHANGE_LAYOUT_HEADER',
			title: 'Counters',
			linkRight: {
				link: '/counter/new',
				value: 'New'
			},
			linkLeft: false
		});
	}
	render() {
		return (
			<div className="counter-container">
				<h3>Counter Name</h3>
				<div className="counter-time">
					<div className="row">
						<div className="col-xs-3">
							<span className="counter-days">
								100
							</span>
						</div>
						<div className="col-xs-3">
							<span className="counter-hours">
								50
							</span>
						</div>
						<div className="col-xs-3">
							<span className="counter-minutes">
								30
							</span>
						</div>
						<div className="col-xs-3">
							<span className="counter-seconds">
								10
							</span>
						</div>
					</div>
					<div className="row counter-labels">
						<div className="col-xs-3">Days</div>
						<div className="col-xs-3">Hours</div>
						<div className="col-xs-3">Minutes</div>
						<div className="col-xs-3">Seconds</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Counter;