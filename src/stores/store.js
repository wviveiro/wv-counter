import {createStore} from 'redux';

const formControl = {
	valid: 'form-group',
	invalid: 'form-group error'
}

let counters = [];

if (window.localStorage.getItem('counters')) {
	counters = JSON.parse(window.localStorage.getItem('counters'));
}


const initialNewCounter = {
	title: '',
	date: '',
	time: '',
	color: '#ccff66',
	formControl: {
		title: formControl.valid,
		date: formControl.valid,
		time: formControl.valid,
	},
	btnSave: {
		value: 'Save',
		disabled: false
	}
}

const initialState = {
	title: 'Wv Counter',
	layout: {
		linkRight: false,
		linkLeft: false
	},
	newCounter: Object.assign({}, initialNewCounter),
	counters: counters.slice(0)
}

/**
 * Set field as invalid in new counter view
 */
const setNewCounterInvalid = (state, field) => {
	state.newCounter.formControl[field] = formControl.invalid;
	return state;
}

/**
 * Change the value of an input field
 */
const changeNewCounterField = (state, field, value) => {
	state.newCounter[field] = value;
	state.newCounter.formControl[field] = formControl.valid;
	return state;
}

const setCounterForm = (state, fields) => {
	state.newCounter = Object.assign({}, initialNewCounter);
	state.newCounter.title = fields.title;
	state.newCounter.date = fields.date;
	state.newCounter.time = fields.time;
	state.newCounter.color = fields.color;

	return state;
}


const handleStore = (state = initialState, action) => {
	let newState = Object.assign({}, state);

	switch (action.type) {
		case 'ADD_LAYOUT_OBJ':
			newState.layout.obj = action.layout;
		break;
		case 'CHANGE_LAYOUT_HEADER':
			newState.layout.linkRight = false;
			newState.layout.linkLeft = false;
			if (action.title) {
				newState.title = action.title;
			}
			if (action.linkRight) {
				newState.layout.linkRight = action.linkRight;
			}
			if (action.linkLeft) {
				newState.layout.linkLeft = action.linkLeft;
			}
			newState.layout.obj.setState(newState);
		break;
		case 'WAIT_NEWCOUNTER_BUTTON':
			newState.newCounter.btnSave = {
				value: 'Wait',
				disabled: true
			};
		break;
		case 'ENABLE_NEWCOUNTER_BUTTON':
			newState.newCounter.btnSave = {
				value: 'Save',
				disabled: false
			};
		break;
		case 'SET_NEWCOUNTER_INVALID':
			newState = setNewCounterInvalid(newState, action.field);
		break;
		case 'CHANGE_NEWCOUNTER_FIELD':
			newState = changeNewCounterField(newState, action.field, action.value);
		break;
		case 'SAVE_NEW_COUNTER':
			newState.counters.push({
				title: newState.newCounter.title,
				date: newState.newCounter.date,
				time: newState.newCounter.time,
				color: newState.newCounter.color,
			});
			window.localStorage.setItem('counters', JSON.stringify(newState.counters));
			newState.newCounter = Object.assign({}, initialNewCounter);
		break;
		case 'GOTO':
			newState.layout.obj.goTo(action.path);
		break;
		case 'ADD_COUNTER_TIME_DIFF':
			newState.counters[action.index].days = action.days;
			newState.counters[action.index].hours = action.hours;
			newState.counters[action.index].minutes = action.minutes;
			newState.counters[action.index].seconds = action.seconds;
		break;
		case 'SET_COUNTER_FORM':
			newState = setCounterForm(newState, action.fields);
		break;
		case 'SAVE_EXISTENT_COUNTER':
			newState.counters[action.index] = {
				title: newState.newCounter.title,
				date: newState.newCounter.date,
				time: newState.newCounter.time,
				color: newState.newCounter.color
			}
			window.localStorage.setItem('counters', JSON.stringify(newState.counters));
			newState.newCounter = Object.assign({}, initialNewCounter);
			break;
		default:
			//nothing happens
	}

	return newState;
}

const store = createStore(handleStore);


export default store;