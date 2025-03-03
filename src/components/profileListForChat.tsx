import { Avatar, List, ListItem, ListItemText, ListItemAvatar } from "@mui/material";
import React from "react";
import Typography from '@mui/material/Typography';
import Chat from "@/types/chat";
import { Link } from "@mui/material";
import { useTranslations } from "next-intl";
import { Profile } from "@/types/profile";

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
    currentProfile: Profile;
}

function ProfileListForChat({ chats, currentProfile }: ProfileListForChatProps) {
    const t = useTranslations('main');
    if (!chats) {
        return null;
    }

    const thisChat =currentProfile;
    const otherChats = chats.filter(chat => chat.name !== currentProfile.name);


    return (
    <List sx={{ 
      width: '100%', 
      maxWidth: 360, 
      bgcolor: 'background.paper',
      display: { xs: 'flex', sm: 'block' },
      flexDirection: { xs: 'row', sm: 'column' },
      flexWrap: { xs: 'wrap', sm: 'nowrap' },
      justifyContent: { xs: 'flex-start', sm: 'flex-start' }
    }}>
      <ListItem sx={{ 
        width: { xs: 'auto', sm: '100%' },
        padding: { xs: 1, sm: 2 }
      }}>
        <ListItemAvatar>
          <Avatar alt={thisChat.name} src={thisChat.avatar} />
        </ListItemAvatar>
        <ListItemText
          sx={{ 
            '& .MuiListItemText-primary': { 
              fontWeight: 'bold' 
            },
            display: { xs: 'none', sm: 'block' }
          }}
          primary={
            <React.Fragment>
              {thisChat.displayName}
              <Typography
                component="span"
                variant="caption"
                sx={{ 
                  ml: 1,
                  color: 'text.secondary',
                  fontSize: '0.75rem'
                }}
              >
                {t('now')}
              </Typography>
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {t('onChatting')}...
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      
      {otherChats.map((chat, index) => (
        <Link href={`/main/chat/${chat.name}`} style={{ textDecoration: 'none', color: 'inherit' }} key={index}>
          <ListItem sx={{ 
            width: { xs: 'auto', sm: '100%' },
            padding: { xs: 1, sm: 2 }
          }}>
            <ListItemAvatar>
              <Avatar alt={chat.name} src={chat.avatar} />
            </ListItemAvatar>
            <ListItemText sx={{ display: { xs: 'none', sm: 'block' } }}
              primary={<React.Fragment>
                {chat.displayName}
                <Typography
                  component="span"
                  variant="caption"
                  sx={{ 
                    ml: 1,
                    color: 'text.secondary',
                    fontSize: '0.75rem'
                  }}
                >
                  {formatTimestamp(chat.lastchatTimestamp)}
                </Typography>
              </React.Fragment>}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ 
                      display: 'inline-block',
                      width: '100%',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      verticalAlign: 'top'
                    }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {chat.description}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        </Link>
      ))}
    </List>
    );
}

export default ProfileListForChat;