import React from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import "./Form.scss"
class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            id: '',
            email: '',
            birthDate: null
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(e) {
        this.setState({ [e.target.name] : e.target.value });
    }
    
    handleSubmit(event) {
        event.preventDefault();
        let {name, lastName, id, birthDate, email} = this.state;
        birthDate = birthDate ? birthDate.format('DD/MM/yyyy') : '';
        document.cookie = 'user=' + JSON.stringify({name, lastName, id, birthDate, email});
        this.props.showMessage();
    }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit} className="form">
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <h1 className="form__header">Candidate Registration</h1>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth name='name' label='Full Name' onChange={this.handleChange} />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <TextField fullWidth name='id' label='ID Number' onChange={this.handleChange}/>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <TextField fullWidth name='userName' label='Github Username' onChange={this.handleChange}/>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <DatePicker
                                fullWidth
                                disableFuture
                                openTo='year'
                                format='DD/MM/yyyy'
                                label='Date of Birth'
                                views={['year', 'month', 'date']}
                                value={this.state.birthDate}
                                onChange={birthDate => this.setState({birthDate})}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <TextField fullWidth name='email' label='E-mail' onChange={this.handleChange}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant='contained'
                            color='primary'
                            size='small'
                            type='submit'
                            className="form__button"
                        >
                            Save Candidate
                        </Button>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

export default Form;