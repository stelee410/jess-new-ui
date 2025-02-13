import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';
import { Profile } from '@/types/profile';

function CCBar({profile}:{profile:Profile}){
    return (
        <AppBar position="static">
                <Container maxWidth="md">
                    <Toolbar 
                        disableGutters 
                        sx={{ 
                            justifyContent: 'center',
                            minHeight: '30px !important'  // 默认是64px
                        }}
                    >
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
                            {profile.displayName}
                        </Typography>
                    </Toolbar>
                </Container>
        </AppBar>
    );
}

export default CCBar;