import React, {Component} from 'react';
import './NewCounter.css';
import store from '../../stores/store';
import {Redirect} from 'react-router-dom';

class NewCounter extends Component {
	constructor(props) {
		super(props);
		this.state = store.getState().newCounter;
	}
	componentDidMount() {
		store.dispatch({
			type: 'CHANGE_LAYOUT_HEADER',
			title: 'New Counter',
			linkLeft: {
				value: 'Back',
				link: '/'
			},
			linkRight: false
		});
	}
	changeField(ev, field) {
		store.dispatch({
			type: 'CHANGE_NEWCOUNTER_FIELD',
			field: field,
			value: ev.target.value
		});
		this.setState(store.getState().newCounter);
	}
	saveNewCounter(ev) {
		ev.preventDefault();
		store.dispatch({type: 'WAIT_NEWCOUNTER_BUTTON'});
		this.setState(store.getState().newCounter);
		let error = false;

		if (this.state.title.length === 0) {
			error = true;
			store.dispatch({
				type: 'SET_NEWCOUNTER_INVALID',
				field: 'title'
			});
		};
		if (this.state.date.length === 0) {
			error = true;
			store.dispatch({
				type: 'SET_NEWCOUNTER_INVALID',
				field: 'date'
			});
		};
		if (this.state.time.length === 0) {
			error = true;
			store.dispatch({
				type: 'SET_NEWCOUNTER_INVALID',
				field: 'time'
			});
		};
		if (this.state.color.length === 0) {
			error = true;
			store.dispatch({
				type: 'SET_NEWCOUNTER_INVALID',
				field: 'color'
			});
		};

		if (error) {
			store.dispatch({type: 'ENABLE_NEWCOUNTER_BUTTON'});
			this.setState(store.getState().newCounter);
			alert('Please, fill all required fields');
			return false;
		};

		store.dispatch({type: 'SAVE_NEW_COUNTER'});
		this.setState(store.getState().newCounter);
	}
	render() {

		if (this.state.isSaved) {
			store.dispatch({type: 'RESET_NEW_COUNTER'});
			return (<Redirect to="/" push />);
		};

		return (
			<div className="new-counter-container">
				<div className="blockForm">
					<div className={this.state.formControl.title}>
						<label>Title</label>
						<input 
							type="text" 
							className="form-control"
							placeholder="Title"
							value={this.state.title}
							onChange={(ev) => {this.changeField(ev, 'title')}} />
					</div>
				</div>
				<div className="blockForm">
					<div className={this.state.formControl.date}>
						<label>Date</label>
						<input 
							type="date" 
							className="form-control"
							placeholder="dd/mm/yyyy"
							value={this.state.date}
							onChange={(ev) => {this.changeField(ev, 'date')}} />
					</div>
				</div>
				<div className="blockForm">
					<div className={this.state.formControl.time}>
						<label>Time</label>
						<input 
							type="time" 
							className="form-control"
							placeholder=""
							value={this.state.time}
							onChange={(ev) => {this.changeField(ev, 'time')}} />
					</div>
				</div>
				<div className="blockForm">
					<div className={this.state.formControl.color}>
						<label>Color</label>
						<input 
							type="color" 
							className="form-control"
							placeholder=""
							value={this.state.color}
							onChange={(ev) => {this.changeField(ev, 'color')}} />
					</div>
				</div>
				<div className="blockForm">
					<button
						className="btn btn-success"
						disabled={this.state.btnSave.disabled}
						onClick={(ev) => {this.saveNewCounter(ev)}}
					>
						{this.state.btnSave.value}
					</button>
				</div>
			</div>
		);
	}
}

export default NewCounter;