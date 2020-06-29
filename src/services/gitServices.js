import axios from 'axios';
const API = 'https://api.github.com';

/**
* Gets a list of repositories from an user
* @param  {String} searchTerm git username
* @return {Array}  List of repositories
*/
const getRepositories = async (searchTerm) => {
    const res = await axios.get(`${API}/users/${searchTerm}/repos`);
    return res.data || [];
};

export default { 
    getRepositories
};