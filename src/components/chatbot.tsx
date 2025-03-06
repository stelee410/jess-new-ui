"use client"
import {Box,CircularProgress} from '@mui/material';
import CCContainer from './chatComponents/ccContainer';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Profile } from '@/types/profile';
import Message from '@/types/message';
import { API_CHAT_HISTORY, API_CHAT, API_NEW_CHAT, API_RESET_MEMORY, API_SHARE_CHAT_HISTORY } from '@/services/const';
import apiClient from '@/services';
import { CHAT_INSTRUCTION } from '@/services/const';
import { useRouter } from 'next/navigation';

function ChatBot({profile}:{profile:Profile}){
    const router = useRouter(); 
    const [messages, setMessages] = useState<Message[]>([] as Message[]);
    const [enableUpdate, setEnableUpdate] = useState(true);
    const [loading, setLoading] = useState(false);
    const t = useTranslations("chat");
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
    function handleAction(action:string){
        if (action === CHAT_INSTRUCTION['new_chat']){
            setMessages([]);
            const url = `${API_NEW_CHAT}/${profile.name}`
            apiClient.get(url)
            .then(() => {
                const newMessage = {
                    "role": "user",
                    "content": `${t("new_chat_success")}`
                } as Message;

                setMessages([newMessage]);
            })
            .catch((err) => {
                console.error(err);
            })
        }else if (action === CHAT_INSTRUCTION['check_profile']){
            router.push(`/legacy/profile/${profile.name}`);  
        }else if (action === CHAT_INSTRUCTION['reset_memory']){
            const url = `${API_RESET_MEMORY}/${profile.name}`
            apiClient.get(url)
            .then(() => {
                const newMessage = {
                    "role": "assistant",
                    "content": `${t("you_have_reset_my_memory")}`
                } as Message;
                setMessages([...messages, newMessage]);
            })
            .catch((err) => {
                console.error(err);
            })
        }else if (action === CHAT_INSTRUCTION['set_as_my_digital_agent']){
            router.push(`/legacy/friend/${profile.name}`);
        }else if (action === CHAT_INSTRUCTION['share_with_creator']){
            const url = `${API_SHARE_CHAT_HISTORY}/${profile.name}`
            apiClient.get(url)
            .then((response) => {
                const sharedStatus = response.data.success
                let newMessage:Message;
                if (sharedStatus){
                    const to_user = response.data.to_user
                    newMessage = {
                        "role": "assistant",
                        "content": `${t("you_have_shared_your_chat_history_with")} ${to_user}`
                    } as Message;
                }else{
                    newMessage = {
                        "role": "assistant",
                        "content": `${t("creator_not_exist")}`
                    } as Message;
                }
                setMessages([...messages, newMessage]);
            })
            .catch((err) => {
                console.error(err);
            })
        }else{
            
        }   
    }
    function updateMsg(newMessage:Message){
        if (newMessage.content.startsWith('~')){
            const action = newMessage.content.slice(1);
            handleAction(action);
            return;
        }

        setMessages((messages) => [...messages, newMessage,{"role":"assistant","content":"~..."}]);
        setEnableUpdate(false);
        apiClient.post(`${API_CHAT}/${profile.name}`, {"content": newMessage.content})
        .then((response) => {
            const serverMessage=response.data as Message
            messages.pop();
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
                width: '100%',
                padding: {xs: 0, sm: 2},
                px: { xs: 0, sm: 2, md: 3 },
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