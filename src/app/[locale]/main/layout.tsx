"use client"
import React, { useEffect, useState } from 'react';
import { Box, CssBaseline, Toolbar, IconButton, Typography, Menu, MenuItem, Avatar } from '@mui/material';
import { useTheme, Theme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@/components/appBar';
import apiClient from '@/services';
import WifiTetheringIcon from '@mui/icons-material/WifiTethering';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ChatIcon from '@mui/icons-material/Chat';
import AddIcon from '@mui/icons-material/Add';
import InboxIcon from '@mui/icons-material/Inbox';
import SettingsIcon from '@mui/icons-material/Settings';
import Drawer from '@/components/drawer';
import DrawerHeader from '@/components/drawerHeader';
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import LanguageIcon from '@mui/icons-material/Language';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme } from '@/styles/theme';
import { API_PING, API_HAS_NEW_MAIL } from '@/services/const';
import { Badge } from '@mui/material';
import { avatarUrl, setAvatarUrl } from '@/app/utils/sharedData';

export default function Layout({ children }: { children: React.ReactNode }) {
    const t = useTranslations('main');
    const theme: Theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [connected, setConnected] = React.useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [username, setUsername] = useState<string>('');
    const [avatar, setAvatar] = useState<string>('');
    const [displayName, setDisplayName] = useState<string>('');
    const router = useRouter();
    const pathname = usePathname();
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

    const handleLanguageMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleLanguageClose = (locale?: string) => {
        setAnchorEl(null);
        if (locale) {
            const newPath = pathname.replace(/^\/[^\/]+/, `/${locale}`);
            router.push(newPath);
        }
    };

    const menuItems = [
        { text: t('discover'), icon: <PersonSearchIcon />, path: '/main' },
        { text: t('create'), icon: <AddIcon /> ,path: '/legacy/profile/:create'},
        { text: t('inbox'), icon: <InboxIcon /> ,path: '/legacy/messages',badge: true},
        { text: t('setting'), icon: <SettingsIcon /> ,path: '/legacy/my'},
    ];
    const [hasNewMail, setHasNewMail] = useState(false);
    useEffect(()=>{
      const checkstatus = async () => {
        try{
          const connectedResponse = await apiClient.get(API_PING)
          if (connectedResponse.data.success === false){
            router.push('/login');
            return;
          }
          setConnected(connectedResponse.status === 200);
          setUsername(connectedResponse.data['username']);
          const avatarUrl = `/static/${connectedResponse.data['avatar']}`
          setAvatar(avatarUrl);
          setDisplayName(connectedResponse.data['display_name']);
          setAvatarUrl(avatarUrl);

          const newMailResponse = await apiClient.get(API_HAS_NEW_MAIL)
          setHasNewMail(newMailResponse.data['has_unread_message']);
        }catch(error){
          console.error(error);
          setHasNewMail(false);
          setConnected(false);
        }
      }
      checkstatus();
      setInterval(async () => {
        await checkstatus();
      }, 60000); // 每分钟检查一次
    },[]);
    return (
      <ThemeProvider theme={darkTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="fixed" open={open}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              {connected ? <WifiTetheringIcon/> : <WifiOffIcon color="error" />} &nbsp;
              <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                {t('linkyunAI')}
              </Typography>
              <Typography variant="h6" noWrap component="div"sx={{ marginRight: 2 }}>
                <Avatar alt={displayName} src={avatar}  sx={{ width: 24, height: 24 }}/>
              </Typography>
              <IconButton
                color="inherit"
                onClick={handleLanguageMenu}
              >
                <LanguageIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => handleLanguageClose()}
              >
                <MenuItem onClick={() => handleLanguageClose('zh')}>中文</MenuItem>
                <MenuItem onClick={() => handleLanguageClose('en')}>English</MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  onClick={() => router.push(item.path)}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {hasNewMail && item.badge && (<Badge 
                        color="error" 
                        variant="dot" 
                        invisible={false} // 根据hasNewMail状态显示或隐藏小红点
                        sx={{
                          '& .MuiBadge-dot': {  // 可选：自定义小红点样式
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            right: 2,
                            top: 2
                          }
                        }}
                      >
                        {item.icon}
                      </Badge>
                    )}
                    {(!item.badge||!hasNewMail)&& item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          {children}
          </Box>
        </Box>
     </ThemeProvider>
    );
}