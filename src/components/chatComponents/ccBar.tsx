import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';
import { Profile } from '@/types/profile';

function CCBar({profile}:{profile:Profile}){
    return (
        <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <ForumIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            }}
                        >
                            Chat with {profile.displayName}
                        </Typography>
                    </Toolbar>
                </Container>
        </AppBar>
    );
}

export default CCBar;