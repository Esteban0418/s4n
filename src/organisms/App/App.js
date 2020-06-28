import React from 'react';
import './App.css';
import { Divider, Grid } from '@material-ui/core';
import Message from '../../atoms/Message/Message'
import Form from '../../molecules/Form/Form';
import SearchForm from '../../molecules/SearchForm/SearchForm';

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
			<Grid container spacing={4} justify="center">
				<Grid
					item
					xs={12}
					lg={4}
					className="App"
				>
					{ wasUserAdded && <Message /> }
					<Form showMessage={this.showMessage} />
				</Grid>
				<Divider variant="fullWidth" />
				<Grid
					item
					xs={12}
					className="App"
				>
					<SearchForm />
				</Grid>
			</Grid>
		);
	}
}

export default App;
