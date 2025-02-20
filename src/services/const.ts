const API_URL = process.env.NODE_ENV === 'development' 
  ? "/api/v1/"
  : "https://linkyun.co/api/v1/";

const API_LOGIN_URL = '/login';
const API_RECENT_CHAT = '/recent-chat';
const API_RECOMMEND_CHAT = '/recommend-chat';
const API_PING = '/ping';
const API_CHAT_HISTORY = '/chat-history';
const API_CHAT = '/chat';
const API_MENUS_AVAILABLE = '/available-menus';
const API_NEW_CHAT = '/new-chat';
const API_HAS_NEW_MAIL = '/has-new-mail';
export { API_URL, API_LOGIN_URL, API_RECENT_CHAT, 
  API_PING,API_RECOMMEND_CHAT,
  API_CHAT_HISTORY, API_CHAT, 
  API_MENUS_AVAILABLE, API_NEW_CHAT, API_HAS_NEW_MAIL};