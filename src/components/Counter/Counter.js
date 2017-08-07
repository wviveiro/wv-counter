import React, {Component} from 'react';
import './Counter.css';
import store from '../../stores/store';
import {Link} from 'react-router-dom';
import moment from 'moment';

class Counter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			counters: store.getState().counters
		}
	}
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

		this.changeDate();
		this.timeout = window.setInterval(() => {
			this.changeDate();
		}, 1000);
	}
	componentWillUnmount() {
		window.clearInterval(this.timeout);
	}
	changeDate() {
		let today = moment();

		this.state.counters.forEach((counter, i) => {
			let time = moment(`${counter.date} ${counter.time}`, 'YYYY-MM-DD HH:mm a');

			let days = moment.duration(today.diff(time)).asDays();
			let rest = days - Math.floor(days);
			let hours = rest * 24;
			rest = hours - Math.floor(hours);
			let minutes = rest * 60;
			rest = minutes - Math.floor(minutes);
			let seconds = rest * 60;


			store.dispatch({
				type: 'ADD_COUNTER_TIME_DIFF',
				index: i,
				days: Math.floor(days),
				hours: Math.floor(hours),
				minutes: Math.floor(minutes),
				seconds: Math.floor(seconds),
			});
		});
		this.setState({counters: store.getState().counters});
	}
	render() {
		if (this.state.counters.length === 0) {
			return (
				<div className="empty-counters">
					<p>No counter created yet.</p>
					<Link to="/counter/new" className="btn btn-success">Add New Counter</Link>
				</div>
			);
		};

		let counters = this.state.counters.map((counter, index) => {
			let divStyle = {
				background: counter.color
			}
			let link = `/counter/${index}`;
			return (
				<Link to={link} key={index}>
					<div className="counter-container" style={divStyle}>
						<h3>{counter.title}</h3>
						<div className="counter-time">
							<div className="row">
								<div className="col-xs-3">
									<span className="counter-days">
										{counter.days}
									</span>
								</div>
								<div className="col-xs-3">
									<span className="counter-hours">
										{counter.hours}
									</span>
								</div>
								<div className="col-xs-3">
									<span className="counter-minutes">
										{counter.minutes}
									</span>
								</div>
								<div className="col-xs-3">
									<span className="counter-seconds">
										{counter.seconds}
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
				</Link>
			);
		});

		

		return (<div>{counters}</div>);
	}
}

export default Counter;