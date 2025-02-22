const API_URL = process.env.NODE_ENV === 'development' 
  ? "/api/v1/"
  : "https://linkyun.co/api/v1/";

const API_LOGIN_URL = '/login';
const API_RECENT_CHAT = '/recent-chat';
const API_PRIVATE_CHAT = '/private-chat';
const API_RECOMMEND_CHAT = '/recommend-chat';
const API_PING = '/ping';
const API_CHAT_HISTORY = '/chat-history';
const API_CHAT = '/chat';
const API_MENUS_AVAILABLE = '/available-menus';
const API_NEW_CHAT = '/new-chat';
const API_HAS_NEW_MAIL = '/has-new-mail';
const API_PROFILE = '/profile';
const API_RESET_MEMORY = '/clear-long-term-memory';
const API_SHARE_CHAT_HISTORY = '/share-chat-history';


const CHAT_INSTRUCTION = {
  "new_chat": "newchat",
  "check_profile": "checkprofile",
  "reset_memory": "resetmemory",
  "set_as_my_digital_agent": "samda",
  "share_with_creator": "swc",
  "unsupported_instruction": "unsupported"
}

export { API_URL, API_LOGIN_URL, API_RECENT_CHAT, 
  API_PRIVATE_CHAT, API_PING,API_RECOMMEND_CHAT,
  API_CHAT_HISTORY, API_CHAT, 
  API_MENUS_AVAILABLE, API_NEW_CHAT, API_HAS_NEW_MAIL, 
  CHAT_INSTRUCTION, API_PROFILE, API_RESET_MEMORY, API_SHARE_CHAT_HISTORY};