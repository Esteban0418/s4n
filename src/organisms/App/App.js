import React from 'react';
import { Divider, Grid } from '@material-ui/core';
import Message from '../../atoms/Message/Message'
import Form from '../../molecules/Form/Form';
import SearchForm from '../../molecules/SearchForm/SearchForm';

import './App.scss';
class App extends React.Component{
	constructor(props) {
        super(props);
        this.state = {
            wasUserAdded: false
		};
		this.showMessage = this.showMessage.bind(this);
	}
	
	showMessage(){
		this.setState({ wasUserAdded: true});
	}

	render(){
		let { wasUserAdded } = this.state;

		return (
			<Grid container spacing={4} justify="center" className="app">
				{ wasUserAdded && 
					<Grid item xs={12} lg={2}>
						<Message /> 
					</Grid>
				}
				<Grid item xs={12} md={6} lg={4}>
					<Form showMessage={this.showMessage} />
				</Grid>
				<Divider variant="middle" className="divider thick"/>
				<Grid item xs={12}>
					<SearchForm />
				</Grid>
			</Grid>
		);
	}
}

export default App;
