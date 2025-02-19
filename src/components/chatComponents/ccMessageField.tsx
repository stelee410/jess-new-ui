import { Box, Button, TextField, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState, useTransition } from 'react';
import SendIcon from '@mui/icons-material/Send';
import '@/styles/chat.css';
import { useTranslations } from 'next-intl';

function CCMessageField({onUpdate, enableUpdate}: {onUpdate: (message: string) => void, enableUpdate: boolean}) {
    const t = useTranslations("chat")
    const [message, setMessage] = useState('');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    
    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleSendMessage = () => {
        if (enableUpdate === false){
            return;
        }
        if (typeof(onUpdate) == 'function'){
            onUpdate(message);
        }
        setMessage('');
    }
    return (
        <Box
            sx={{
                marginTop: '10px',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 1,
                display: 'flex',
                justifyContent: 'space-between',
                padding: 1,
            }}
        >
            <TextField 
                variant="outlined" 
                placeholder="Type a message" 
                fullWidth 
                size="small" 
                sx={{
                    borderRadius: '20px',
                }}
                onChange={(e) => setMessage(e.target.value)}
                value = {message}
                className="chat-input"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSendMessage();
                        e.preventDefault(); // Prevents the addition of a new line in the TextField after pressing 'Enter'
                    }
                }}
            />
            <Button 
                variant="contained" 
                color="primary" 
                size="small"
                sx={{
                    marginLeft: 1,
                    backgroundColor: '#07c160',
                    '&:hover': {
                        backgroundColor: '#05a54c',
                    },
                }}
                onClick={handleSendMessage}
            >
                <SendIcon />
            </Button>
            <IconButton
                    onClick={handleMenuClick}
                    size="small"
                    sx={{
                        marginLeft: 1,
                        backgroundColor: '#07c160',
                        color: 'black',
                        borderRadius: '4px',  // 减少圆角
                        '&:hover': {
                            backgroundColor: '#05a54c',
                        },
                    }}
                >
                    <MoreVertIcon />
            </IconButton>
            <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={handleMenuClose}>{t("check_profile")}</MenuItem>
                    <MenuItem onClick={handleMenuClose}>{t("new_chat")}</MenuItem>
                    <MenuItem onClick={handleMenuClose}>{t("reset_memory")}</MenuItem>
                    <MenuItem onClick={handleMenuClose}>{t("set_as_my_digital_agent")}</MenuItem>
                    <MenuItem onClick={handleMenuClose}>{t("share_with_creator")}</MenuItem>
            </Menu>
        </Box>
    )
}

export default CCMessageField;