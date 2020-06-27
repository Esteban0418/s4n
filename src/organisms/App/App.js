import React from 'react';
import './App.css';
import { Grid } from '@material-ui/core';
import Form from '../../molecules/Form/Form';

class App extends React.Component{
	render(){
		return (
			<Grid
				container
				direction="row"
				justify="center"
				alignItems="center"
				className="App"

			>
				<Form/>
			</Grid>
		);
		}
}

export default App;
