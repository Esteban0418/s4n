import React from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import axios from 'axios';
import MaterialTable from 'material-table';

import './SearchForm.scss';

/**
* Displays a searchbar and a sortable and filterable table
*/
class SearchForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            searchTerm: '',
            repositories: [],
            tableData: [],
            filteredTableData: null,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
    * Maps list of repositories and return an array with repository information like language, default branch, url, name and description
    * @param  {Array} repositories List of repositories
    * @return {Array}  Returns list of repositories with specific data
    */
    setTableData(repositories) {
        return repositories.map( ({language, default_branch, html_url, name, description }) => (
            { language, default_branch, html_url, name, description }
        ))
    }

    /**
     * Sets the state for the input that triggers this function
    * @param  {Event} e event
     */
    handleChange(e) {
        this.setState({ [e.target.name] : e.target.value });
    }

    /**
     * Filters table rows.
     * Gets user list of repositories when filter value is equal or grater than 3 characters,
     * then it filters each repository name by transforming the name to lower case,
     * and finally it compares if the filter value matches the repository name.
     * returns the first 5 matches.
     * 
     * If filter values is shorter than 3 characters, it sets the filtered data to an empty array so it displays all repositories again.
     * @param  {Event} e event
     */
    handleFilterChange(e) {
        if(e.target.value.length >= 3) {
            const filteredTableData = this.state.tableData.filter( (repo) => repo.name.toLowerCase().indexOf(e.target.value) > -1 ).slice(0,5);
            this.setState({filteredTableData, [e.target.name] : e.target.value})
        }else {
            this.setState({filteredTableData: null})
        }
    }

    /**
    * Gets all repositories from a specific user parses data to be used in table component.
    * When user is not found, sets table data to an empty array
    * @param  {Event} e event
    * @return {Array}  Returns list of repositories with specific data
    */
    handleSubmit(e) {
        e.preventDefault();
        axios.get(`https://api.github.com/users/${this.state.searchTerm}/repos`)
            .then(res => {
                const repositories = res.data;
                this.setState({ tableData: this.setTableData(repositories) });
                
            }, () => this.setState({ tableData: [] }))
    }

    /**
    * Returns a Boolean to determine if table pagination should be displayed
    * @param  {Array} tableData Array of table row
    * @param  {Array} filteredTableData Array of filtered table rows
    * @return {Boolean}  Returns true if there are more than 5 table rows
    */
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
                                name='searchTerm' 
                                label='Search Github Username' 
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