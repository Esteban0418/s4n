import React from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import axios from 'axios';
import MaterialTable from 'material-table';

import './SearchForm.scss';


class SearchForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            search: '',
            repositories: [],
            tableData: [],
            filteredTableData: null,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.displayPagination = this.displayPagination.bind(this);
    }

    setTableData(repositories) {
        return repositories.map( ({language, default_branch, html_url, name, description }) => {
            return { language, default_branch, html_url, name, description }
        })
    }

    handleChange(e) {
        this.setState({ [e.target.name] : e.target.value });
    }

    handleFilterChange(e) {
        if(e.target.value.length >= 3) {
            const filteredTableData = this.state.tableData.filter( (repo) => repo.name.indexOf(e.target.value) > -1 );
            this.setState({filteredTableData, [e.target.name] : e.target.value})
        }else {
            this.setState({filteredTableData: null})
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        axios.get(`https://api.github.com/users/${this.state.search}/repos`)
            .then(res => {
                const repositories = res.data;
                this.setState({ tableData: this.setTableData(repositories) });
                
            }, () => this.setState({ tableData: [] }))
    }

    displayPagination(tableData, filteredTableData) {
        if(filteredTableData) {
            return filteredTableData.length > 5
        }
        return tableData.length > 5
    }

    render() {
        let {tableData,filteredTableData} = this.state;
        return (
            <>
                <Grid container spacing={4}  justify='center' >
                    <Grid item xs={12} md={6} lg={4}>
                        <form onSubmit={this.handleSubmit} className='searchForm'>
                            <TextField 
                                name='search' 
                                label='Search User' 
                                variant='outlined' 
                                fullWidth
                                onChange={this.handleChange} 
                                className='searchForm__textField'/>
                            <Button
                                variant='contained'
                                color='primary'
                                size='small'
                                type='submit'
                                className='searchForm__button compact'
                            >
                                Search
                            </Button>
                        </form>
                    </Grid>
                </Grid>
                <Grid container spacing={4}  justify='center' >
                    <Grid item xs={12} lg={10}>
                        <div className='filter__container'>
                            <TextField 
                                name='filter' 
                                label='Filter by Name'
                                onChange={this.handleFilterChange}
                                className='filter__container--input'
                            />
                        </div>
                        <MaterialTable
                            title='User Repositories'
                            columns={[
                                { title: 'Language', field: 'language' },
                                { title: 'Default Branch', field: 'default_branch' },
                                { title: 'URL', field: 'html_url' },
                                { title: 'Name', field: 'name' },
                                { title: 'Description', field: 'description', cellStyle: { width: 90, maxWidth: 90 } }
                            ]}
                            data={filteredTableData || tableData}
                            options={{
                                search: false,
                                paging: this.displayPagination(tableData, filteredTableData)
                            }}
                        />
                    </Grid>
                </Grid>
            </>
        );
    }
}

export default SearchForm;