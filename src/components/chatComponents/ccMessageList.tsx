"use client"
import { Avatar, Box, List, ListItem } from "@mui/material";
import { useRef, useEffect } from "react";
import Message from "@/types/message";
import { Profile } from "@/types/profile";
import { avatarUrl } from "@/utils/sharedData";

function CCMessageList({messages, profile}:{messages:Message[], profile:Profile}){
    const myAvatar = avatarUrl;
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    
    useEffect(scrollToBottom, [messages]);
    function wrapContent(message:Message){
        if (message.content == '~...'){
            return ( <Box sx={{display: 'flex', alignItems: 'center' }}>
                <img src="/chat_progress.gif" alt="Loading..." style={{ height: '20px', marginRight: '8px',marginLeft: '8px' }} />
                </Box>)
        }
        return message.content;
    }
    return (
        <List
            sx={{
                overflowY: 'scroll',
                height: 'calc(80vh - 40px)',
                padding: 1,
                '&::-webkit-scrollbar': {
                    width: '0.4em',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'rgba(0, 0, 0, .1)',
                },
                color: 'black',
            }}
        >
            {messages.map((message, index) => (
                    <ListItem 
                        key={index} 
                        sx={{
                            display: 'flex',
                            flexDirection: message.role === 'user' ? 'row-reverse' : 'row',
                            justifyContent: 'flex-start',
                            marginBottom: 1,
                        }}
                    >
                        <Avatar src={message.role === 'user' ? myAvatar : profile.avatar} sx={
                            {
                                marginLeft: message.role === 'user' ? 1 : 0,
                                marginRight: message.role === 'user' ? 0 : 1,
                            }
                        }/>
                        <Box
                            sx={{
                                padding: 1,
                                backgroundColor: message.role === 'user' ? '#78e08f' : '#82ccdd',
                                borderRadius: '10px',
                                maxWidth: '70%',
                                wordWrap: 'break-word',
                                marginLeft: message.role === 'user' ? 1 : 0,
                                marginRight: message.role === 'user' ? 0 : 1,
                            }}
                        >
                            {wrapContent(message)}
                        </Box>
                    </ListItem>
            ))}
            <div ref={messagesEndRef} />
        </List>
    );
}

export default CCMessageList;