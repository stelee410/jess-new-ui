interface Message {
    role: 'user' | 'assistant';
    message: string;
}

export default Message;