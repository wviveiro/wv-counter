import React, {Component} from 'react';
import store from '../../stores/store';
import CounterForm from '../../components/CounterForm/CounterForm';

class OpenCounter extends Component {
	constructor(props) {
		super(props);
		this.state = store.getState().counters[+this.props.match.params.id_counter];
	}
	componentDidMount() {
		store.dispatch({
			type: 'CHANGE_LAYOUT_HEADER',
			title: 'Edit Counter',
			linkLeft: {
				value: 'Back',
				link: '/'
			},
			linkRight: false
		});
	}
	saveNewCounter() {
		store.dispatch({type: 'SAVE_EXISTENT_COUNTER', index: +this.props.match.params.id_counter});
		store.dispatch({type: 'GOTO', path: '/'});
	}
	render() {

		let fields = {
			title: this.state.title,
			date: this.state.date,
			time: this.state.time,
			color: this.state.color,
		};

		return (
			<CounterForm fields={fields} callback={() => {this.saveNewCounter()}} />
		);
	}
}

export default OpenCounter;