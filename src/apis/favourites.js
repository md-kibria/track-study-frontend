import axios from 'axios';
import api_url from '../../config/api_url';
import {getItem} from '../utils/storage'

const token = `Bearer ${getItem('LOCAL_TOKEN')}`

// Get all favourites
export const getALlFavourites = () => {
    axios.defaults.headers.common["Authorization"] = token;
    return axios.get(`${api_url}/api/v1/users/favourites/`)
}

// Add to favourites
export const addToFavourites = (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    return axios.post(`${api_url}/api/v1/users/favourites/add/${id}`)
}

// Get all favourites
export const removeFromFavourites = (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    return axios.delete(`${api_url}/api/v1/users/favourites/remove/${id}`)
}