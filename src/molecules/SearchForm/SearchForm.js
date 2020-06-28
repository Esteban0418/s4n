import React from 'react';
import { Button, TextField } from '@material-ui/core';
import axios from 'axios';

class SearchForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            search: '',
            repositories: [],
            isUserFound: true
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name] : e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        axios.get(`https://api.github.com/users/${this.state.search}/repos`)
            .then(res => {
                const repositories = res.data;
                this.setState({ repositories, isUserFound: true });
            }, e => this.setState({ isUserFound: false}))
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <TextField name='search' label='Search User' onChange={this.handleChange}/>
                    <Button
                        variant='contained'
                        color='secondary'
                        size='small'
                        type='submit'
                    >
                        Search
                    </Button>
                    <ul>
                        {this.state.repositories.map( repo => <li>{repo.name}</li>)}
                    </ul>
                </form>
                { !this.state.isUserFound && <p>User has not been found</p>}
            </div>
        );
    }
}

export default SearchForm;