// 客户端组件使用 hooks
'use client';
import { useState, useEffect } from "react";
import apiClient from "@/services";
import { API_RECENT_CHAT, API_PROFILE } from "@/services/const";
import type { Profile } from '@/types/profile';
import { Grid, Paper } from '@mui/material';
import ProfileListForChat from "./profileListForChat";
import ChatBot from "./chatbot";


export default function Chat({ profileName }: { profileName: string }) {
    const [recentChats, setRecentChats] = useState([]);
    const [currentProfile, setCurrentProfile] = useState<Profile>({
        name: '',
        displayName: '',
        avatar: '',
        description: ''
    });
    useEffect(() => {
        const fetchChats = async () => {
            try {
                const res = await apiClient.get(API_RECENT_CHAT);
                const rc = res.data
                setRecentChats(rc);
                const profileRes = await apiClient.get(`${API_PROFILE}/${profileName}`);
                setCurrentProfile(profileRes.data);
            } catch (error) {
                console.error('Error fetching chats:', error);
            }
        };
        
        fetchChats();
    }, []);

    return (
        <Grid container component="main" sx={{ height: '86vh' }}>
            <Grid item xs={false} sm={2} md={3} >
                <ProfileListForChat chats={recentChats} currentProfile={currentProfile}/>
            </Grid>
            <Grid item xs={12} sm={10} md={9} component={Paper} elevation={6}>
                <ChatBot profile={currentProfile}/>
            </Grid>
        </Grid>
    );
}