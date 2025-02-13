import { Grid, Paper } from '@mui/material';
import ProfileListForChat from '@/components/profileListForChat';
import ChatBot from '@/components/chatbot';
import { Profile } from '@/types/profile';

export default async function Chat({
  params,
}: {
  params: Promise<{profileName: string}> | {profileName: string}
}) {
    // 等待 params 解析完成
    const resolvedParams = await Promise.resolve(params);
    const profileName = resolvedParams.profileName;
    const recent_chats = [
        {name:'jess',displayName:'Jess C', avatar:'/samples/sample.png',lastchat:'豚豚，你知道其实我想你', lastchatTimestamp:'2021-10-01T12:00:00.000Z'},
        {name:'catty',displayName:'Catty', avatar:'/samples/sample2.png',lastchat:'这里真好玩～',lastchatTimestamp:'2021-10-01T12:00:00.000Z'},
        {name:'yuki',displayName:'Yuki', avatar:'/samples/sample3.png',lastchat:'亲爱的，你在干嘛呢？',lastchatTimestamp:'2021-10-01T12:00:00.000Z'},
        {name:'elle',displayName:'Elle', avatar:'/samples/sample4.jpg',lastchat:'人生有的时候就是很难，但是我会一直陪着你的',lastchatTimestamp:'2021-10-01T12:00:00.000Z'},
        {name:'jessica',displayName:'Jessica', avatar:'/samples/sample5.jpg',lastchat:'今天天气真好，我们一起去爬山吧',lastchatTimestamp:'2021-10-01T12:00:00.000Z'},
    ];
    const currentChat = recent_chats.find(chat => chat.name === profileName);
    const currentProfile = {
        name:currentChat?.name,
        displayName:currentChat?.displayName,
        avatar:currentChat?.avatar,
        description:""
    } as Profile;

    return (
        <Grid container component="main" sx={{ height: '86vh' }}>
            <Grid item xs={false} sm={2} md={3} >
                <ProfileListForChat chats={recent_chats} currentProfile={profileName}/>
            </Grid>
            <Grid item 
                xs={12} 
                sm={10} 
                md={9} 
                component={Paper} 
                elevation={6}
            >
                <ChatBot profile={currentProfile}/>
            </Grid>
        </Grid>
    )
}