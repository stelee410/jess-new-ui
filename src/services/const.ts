const API_URL = process.env.NODE_ENV === 'development' 
  ? "/api/v1/"
  : "https://linkyun.co/api/v1/";

const API_LOGIN_URL = '/login';
const API_RECENT_CHAT = '/recent-chat';
const API_RECOMMEND_CHAT = '/recommend-chat';
const API_PING = '/ping';

export { API_URL, API_LOGIN_URL, API_RECENT_CHAT, API_PING,API_RECOMMEND_CHAT };