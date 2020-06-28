import React from 'react';
import './App.css';
import { Grid } from '@material-ui/core';
import Message from '../../atoms/Message/Message'
import Form from '../../molecules/Form/Form';

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
			<Grid
				container
				direction="row"
				justify="center"
				alignItems="center"
				className="App"
			>
				{ wasUserAdded && <Message /> }
				<Form showMessage={this.showMessage} />
			</Grid>
		);
		}
}

export default App;
