import React, {Component} from 'react';
import store from '../../stores/store';
import CounterForm from '../../components/CounterForm/CounterForm';

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
	saveNewCounter() {
		store.dispatch({type: 'SAVE_NEW_COUNTER'});
		this.setState(store.getState().newCounter);
		store.dispatch({type: 'GOTO', path: '/'});
	}
	render() {

		let fields = {
			title: '',
			date: '',
			time: '',
			color: '#0000FF',
		};

		return (
			<CounterForm fields={fields} callback={() => {this.saveNewCounter()}} />
		);
	}
}

export default NewCounter;