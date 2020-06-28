import React from 'react';
import { Button, TextField } from '@material-ui/core';
import axios from 'axios';
import MaterialTable from 'material-table';


class SearchForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isUserFound: true,
            search: '',
            repositories: [],
            tableData: [],
            filteredTableData: null
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
        const filteredTableData = this.state.tableData.filter( (repo) => repo.name.indexOf(e.target.value) > -1 );
        this.setState({filteredTableData})
    }

    handleSubmit(e) {
        e.preventDefault();
        axios.get(`https://api.github.com/users/${this.state.search}/repos`)
            .then(res => {
                const repositories = res.data;
                this.setState({ 
                    tableData: this.setTableData(repositories), 
                    isUserFound: true
                });
                
            }, () => this.setState({ isUserFound: false }))
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
                </form>
                <TextField name='filter' label='Filter by Name' onChange={this.handleFilterChange}/>
                <MaterialTable
                    title="User Repositories"
                    columns={[
                        { title: 'Language', field: 'language' },
                        { title: 'Default Branch', field: 'default_branch' },
                        { title: 'URL', field: 'html_url' },
                        { title: 'Name', field: 'name' },
                        { title: 'Description', field: 'description' }
                    ]}
                    data={filteredTableData || tableData}
                    options={{
                        paging: this.displayPagination(tableData, filteredTableData)
                    }}
                />
                { !this.state.isUserFound && <p>User has not been found</p>}
            </div>
        );
    }
}

export default SearchForm;