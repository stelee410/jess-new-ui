import { Avatar, List, ListItem, ListItemText, Divider, ListItemAvatar } from "@mui/material";
import React from "react";
import Typography from '@mui/material/Typography';
import Chat from "@/types/chat";
import { Link } from "@mui/material";
import { useTranslations } from "next-intl";

function formatTimestamp(timestamp?: string): string {
    const ts = timestamp ? new Date(timestamp) : new Date();
    return new Intl.DateTimeFormat('en-GB', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    }).format(ts);
}

interface ProfileListForChatProps {
    chats: Chat[];
    currentProfile?: string;
}

function ProfileListForChat({ chats, currentProfile }: ProfileListForChatProps) {
    const t = useTranslations('main');
    if (!chats) {
        return null;
    }
    if (!currentProfile) {
        currentProfile = chats[0].name;
    }
    const thisChat = chats.find(chat => chat.name === currentProfile);
    const otherChats = chats.filter(chat => chat.name !== currentProfile);

    if (!thisChat) {
        return null;
    }

    return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={thisChat.name} src={thisChat.avatar} />
        </ListItemAvatar>
        <ListItemText
          sx={{ 
            '& .MuiListItemText-primary': { 
              fontWeight: 'bold' 
            }
          }}
          primary={thisChat.displayName}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {formatTimestamp()}
              </Typography>
               &nbsp; — &nbsp; {t('onChatting')}
            </React.Fragment>
          }
        />
      </ListItem>
      {
        otherChats.map((chat, index) => (
            <div key={index}>
            <Divider variant="inset" component="li" />
            <Link href={`/main/chat/${chat.name}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                <Avatar alt={chat.name} src={chat.avatar} />
                </ListItemAvatar>
                <ListItemText
                primary={chat.displayName}
                secondary={
                    <React.Fragment>
                    <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                    >
                        {formatTimestamp(chat.lastchatTimestamp)}
                    </Typography>
                    &nbsp; — &nbsp; {chat.lastchat}
                    </React.Fragment>
                }
                />
            </ListItem>
            </Link>
            </div>
        )
        )
      }
    </List>
    );
}

export default ProfileListForChat;