import axios from "axios"
import { getItem } from "../utils/storage"
import api_url from "../../config/api_url"

const token = `Bearer ${getItem('LOCAL_TOKEN')}`

export const login = ({email, password}) => {
    return axios.post(`${api_url}/api/v1/users/login`, {email, password})
}

export const registation = ({name, email, password, passwordConfirmation}) => {
    return axios.post(`${api_url}/api/v1/users/register`, {name, email, password, passwordConfirmation})
}

export const updateUser = (id, {name, email}) => {
    axios.defaults.headers.common["Authorization"] = token;
    return axios.patch(`${api_url}/api/v1/users/${id}`, {name, email})
}

export const getUser = (id) => {
    axios.defaults.headers.common["Authorization"] = token
    return axios.get(`${api_url}/api/v1/users/${id}`)
}

export const editPass = (data) => {
    axios.defaults.headers.common["Authorization"] = token
    return axios.post(`${api_url}/api/v1/users/password`, data)
}