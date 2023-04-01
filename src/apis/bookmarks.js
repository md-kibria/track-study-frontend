import axios from 'axios';
import api_url from '../../config/api_url';
import { getItem } from '../utils/storage'

const token = `Bearer ${getItem('LOCAL_TOKEN')}`

// Get all Favourites
export const getALlBookmarks = () => {
    axios.defaults.headers.common["Authorization"] = token;
    return axios.get(`${api_url}/api/v1/users/bookmarks/`)
}

// Add to Bookmarks
export const addToBookmarks = (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    return axios.post(`${api_url}/api/v1/users/bookmarks/add/${id}`)
}

// Get all Bookmarks
export const removeFromBookmarks = (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    return axios.delete(`${api_url}/api/v1/users/bookmarks/remove/${id}`)
}