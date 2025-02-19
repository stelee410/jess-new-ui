import {Box} from '@mui/material';
import CCMessageList from "./ccMessageList"
import CCMessageField from "./ccMessageField"
import { Profile } from "@/types/profile";
import Message from "@/types/message";


type updateMessagesType = (msg:Message) => void;

function CCContainer({messages, profile, updateMessages,enableUpdate}:
    {messages:Message[], profile:Profile, updateMessages:updateMessagesType,enableUpdate:boolean}){
    function updateMsg(msg:string){
        const newMessage = {
            "role": "user",
            "content": msg
        } as Message;
        updateMessages(newMessage);
    }
    return (
        <Box sx={{ 
                    backgroundImage: `url(${profile.avatar})`,
                    backgroundSize: 'cover', // Add this line
                    backgroundRepeat: 'no-repeat', // Add this line
                    backgroundPosition: 'bottom', // Add this line
                    '::before': {
                        content: '""',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                    height: '84vh',
                    width: '68vw',
                    marginTop: 1}}>

            <CCMessageList messages={messages} profile={profile} />
            
            <CCMessageField onUpdate={updateMsg} enableUpdate = {enableUpdate}/>
            


        </Box>
    )
}

export default CCContainer;