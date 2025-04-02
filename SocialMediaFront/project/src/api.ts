import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const fetchTopUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const fetchTrendingPosts = async () => {
  const response = await axios.get(`${API_URL}/posts?type=popular`);
  return response.data;
};

export const fetchLatestPosts = async () => {
  const response = await axios.get(`${API_URL}/posts?type=latest`);
  return response.data;
};