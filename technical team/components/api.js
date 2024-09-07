import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api'; // Update this with your API base URL

export const fetchPosts = (page) => axios.get(`${API_BASE_URL}/posts?page=${page}&sort=updated_at,asc`);
export const fetchPostById = (id) => axios.get(`${API_BASE_URL}/posts/${id}`);
export const deletePostById = (id) => axios.delete(`${API_BASE_URL}/posts/${id}`);
export const updatePostById = (id, data) => axios.put(`${API_BASE_URL}/posts/${id}`, data);
