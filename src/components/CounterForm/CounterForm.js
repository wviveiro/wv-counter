import React, {Component} from 'react';
import store from '../../stores/store';
import './CounterForm.css';

class CounterForm extends Component {
	constructor(props) {
		super(props);
		store.dispatch({type: 'SET_COUNTER_FORM', fields: this.props.fields});
		this.state = store.getState().newCounter;
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

		this.props.callback();
	}
	changeField(ev, field) {
		store.dispatch({
			type: 'CHANGE_NEWCOUNTER_FIELD',
			field: field,
			value: ev.target.value
		});
		this.setState(store.getState().newCounter);
	}
	render() {

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

export default CounterForm;