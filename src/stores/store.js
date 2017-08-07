import {createStore} from 'redux';

const formControl = {
	valid: 'form-group',
	invalid: 'form-group error'
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
	},
	isSaved: false
}

const initialState = {
	title: 'Wv Counter',
	layout: {
		linkRight: false,
		linkLeft: false
	},
	newCounter: Object.assign({}, initialNewCounter),
	counters: []
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
			newState.newCounter.isSaved = true;
		break;
		case 'RESET_NEW_COUNTER':
			newState.NewCounter = Object.assign({}, initialNewCounter);
		break;
		default:
			//nothing happens
	}

	return newState;
}

const store = createStore(handleStore);


export default store;