import { Card, CardMedia, CardContent, CardActions, Button, Typography, Avatar, Box, Link } from "@mui/material";
import { Profile } from '@/types/profile';
import { useTranslations } from 'next-intl';

function ProfileCard({profile}:{profile:Profile}){
    const t = useTranslations('profileCard');
    return (
        <Card sx={{ maxWidth: 345 , width: 240, margin: 1 }}>
            <Box sx={{ position: 'relative' }}>
                <CardMedia
                    sx={{ height: 140, filter: 'blur(4px)' }}
                    image={profile.avatar}
                    title={profile.name}
                />
                <Avatar 
                    src={profile.avatar} 
                    alt={profile.name} 
                    sx={{ width: 80, height: 80, position: 'absolute', top: '100%', left: '20%', transform: 'translate(-50%, -50%)', border: '2px solid grey' }}
                />
            </Box>
        <CardContent sx={{ marginTop: 4 }}>
            <Typography gutterBottom variant="h5" component="div">
            {profile.displayName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {profile.description}
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small">{t('share')}</Button>
            <Link href={`/main/chat/${profile.name}`} style={{ textDecoration: 'none' }}>
                <Button size="small">{t('chat')}</Button>
            </Link>
        </CardActions>
        </Card>
    )
}

export default ProfileCard;