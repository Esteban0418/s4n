import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            id: '',
            email: '',
            date: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(e) {
        this.setState({ [e.target.name] : e.target.value });
    }
    
    handleSubmit(event) {
        event.preventDefault();
        let {name, lastName, id, date, email} = this.state;
        date = date ? date.format('DD/MM/yyyy') : '';
        document.cookie = 'user=' + JSON.stringify({name, lastName, id, date, email});
    }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <TextField name='name' label='Full Name' onChange={this.handleChange} />
                <TextField name='id' label='ID Number' onChange={this.handleChange}/>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DatePicker
                        disableFuture
                        openTo='year'
                        format='DD/MM/yyyy'
                        label='Date of birth'
                        views={['year', 'month', 'date']}
                        value={this.state.date}
                        onChange={date => this.setState({date})}
                    />
                </MuiPickersUtilsProvider>
                <TextField name='email' label='E-mail' onChange={this.handleChange}/>
                <Button
                    variant='contained'
                    color='primary'
                    size='small'
                    type='submit'
                >
                    Save Candidate
                </Button>
            </form>
        );
      }
  }

  export default Form;