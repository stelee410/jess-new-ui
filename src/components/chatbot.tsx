"use client"
import {Box,CircularProgress} from '@mui/material';
import CCContainer from './chatComponents/ccContainer';
import { useState, useEffect } from 'react';
import { Profile } from '@/types/profile';
import Message from '@/types/message';
import { API_CHAT_HISTORY, API_CHAT } from '@/services/const';
import apiClient from '@/services';

function ChatBot({profile}:{profile:Profile}){
    const [messages, setMessages] = useState<Message[]>([] as Message[]);
    const [enableUpdate, setEnableUpdate] = useState(true);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchMessages = async () => {
            setLoading(true);
            setEnableUpdate(false);
            try{
                if(!profile.name){
                    return;
                }
                const url = `${API_CHAT_HISTORY}/${profile.name}`
                const response = await apiClient.get(url);
                setMessages(response.data);
            }catch(err){
                console.error(err);
            }finally{
                setEnableUpdate(true);
                setLoading(false);
            }
        }
        fetchMessages();
    }, [profile]);
    function updateMsg(newMessage:Message){
        setMessages((messages) => [...messages, newMessage]);
        setEnableUpdate(false);
        apiClient.post(`${API_CHAT}/${profile.name}`, {"content": newMessage.content})
        .then((response) => {
            const serverMessage=response.data as Message
            setMessages((messages) => [...messages, serverMessage]);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            setEnableUpdate(true);
        });
    }
    return (
        
        <Box
            sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
        >
            {loading && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}>
              <CircularProgress />
            </div>
        )}
            <CCContainer messages={messages} profile={profile} updateMessages={updateMsg} enableUpdate={enableUpdate}/>
        </Box>
    )
}

export default ChatBot;