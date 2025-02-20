import { Box, Button, TextField, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { CHAT_INSTRUCTION } from '@/services/const';
import '@/styles/chat.css';
import { useTranslations } from 'next-intl';
import { API_MENUS_AVAILABLE } from '@/services/const';
import { Profile } from '@/types/profile';
import apiClient from '@/services';

function CCMessageField({onUpdate, enableUpdate, profile}: {onUpdate: (message: string) => void, enableUpdate: boolean, profile: Profile}) {
    const t = useTranslations("chat")
    const [message, setMessage] = useState('');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [menusAvailable, setMenusAvailable] = useState<string[]>([]);
    useEffect(() => {
        async function fetchMenusAvailable(){
            try {
                if (!profile.name){
                    return;
                }
                const response = await apiClient.get(`${API_MENUS_AVAILABLE}/${profile.name}`);
                setMenusAvailable(response.data);
            } catch (error) {
                console.error('Error fetching menus available:', error);
            }
        }
        fetchMenusAvailable();
    }, [profile]);
    
    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleMenuClose = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(null);
        //instruction will be moved to consts.ts
        const action = event.currentTarget.getAttribute('value');
        if (action){
            try{
                onUpdate(`~${CHAT_INSTRUCTION[action as keyof typeof CHAT_INSTRUCTION]}`);
            }catch(error){
                onUpdate(`~${CHAT_INSTRUCTION['unsupported_instruction']}`);
            }
        }
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
                <SendIcon/>
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
                    {(menusAvailable.indexOf('check_profile') !== -1)&&(<MenuItem onClick={handleMenuClose} value="check_profile">{t("check_profile")}</MenuItem>)}
                    <MenuItem onClick={handleMenuClose} value="new_chat">{t("new_chat")}</MenuItem>
                    {menusAvailable.indexOf('reset_memory') !== -1&&(<MenuItem onClick={handleMenuClose} value="reset_memory">{t("reset_memory")}</MenuItem>)}
                    <MenuItem onClick={handleMenuClose} value="set_as_my_digital_agent">{t("set_as_my_digital_agent")}</MenuItem>
                    {menusAvailable.indexOf('share_with_creator') !== -1&&(<MenuItem onClick={handleMenuClose} value="share_with_creator">{t("share_with_creator")}</MenuItem>)}
            </Menu>
        </Box>
    )
}

export default CCMessageField;