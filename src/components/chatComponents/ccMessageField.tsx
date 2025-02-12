import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import '@/styles/chat.css';

function CCMessageField({onUpdate, enableUpdate}: {onUpdate: (message: string) => void, enableUpdate: boolean}) {
    const [message, setMessage] = useState('');
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
                position: 'absolute',
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
        </Box>
    )
}

export default CCMessageField;