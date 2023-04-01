import axios from "axios";
import api_url from "../../config/api_url";
import { getItem } from "../utils/storage";

const token = `Bearer ${getItem('LOCAL_TOKEN')}`

// Get all books
export const getBooksApi = () => {
    axios.defaults.headers.common["Authorization"] = token;
    return axios.get(`${api_url}/api/v1/books`);
};

// Get signle book
export const getBookApi = (bookId) => {
    axios.defaults.headers.common["Authorization"] = token;
    return axios.get(`${api_url}/api/v1/books/${bookId}`);
};

// Create book
export const createBook = (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    return axios.post(`${api_url}/api/v1/books/add`, data)
}

// Update book
export const updateBook = (bookId, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    return axios.put(`${api_url}/api/v1/books/update/${bookId}`, data)
}

// Update chapter
export const updateChapter = (bookId, chapterId, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    return axios.put(`${api_url}/api/v1/books/update/${bookId}/chapter/${chapterId}`, data)
}

// Update milestone
export const updateMilestone = (bookId, chapterId, milestoneId, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    return axios.put(`${api_url}/api/v1/books/update/${bookId}/chapter/${chapterId}/milestone/${milestoneId}`, data)
}

// Delete book
export const deleteBook = (bookId) => {
    axios.defaults.headers.common["Authorization"] = token;
    return axios.delete(`${api_url}/api/v1/books/delete/${bookId}`)
}