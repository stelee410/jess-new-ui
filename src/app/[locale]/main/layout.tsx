"use client"
import React, { useEffect } from 'react';
import { Box, CssBaseline, Toolbar, IconButton, Typography } from '@mui/material';
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


export default function Layout({ children }: { children: React.ReactNode }) {
    const t = useTranslations('main');
    const theme: Theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [connected, setConnected] = React.useState(false);
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

    const menuItems = [
        { text: t('discover'), icon: <PersonSearchIcon /> },
        { text: t('chat'), icon: <ChatIcon /> },
        { text: t('create'), icon: <AddIcon /> },
        { text: t('inbox'), icon: <InboxIcon /> },
        { text: t('setting'), icon: <SettingsIcon /> },
    ];
    
    useEffect(()=>{
      apiClient.get('/ping').then(message=>{
        setConnected(true);
      }).catch(error=>{
        setConnected(false);
      });
    },[]);
    return (
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
              <Typography variant="h6" noWrap component="div">
                {t('linkyunAI')}
              </Typography>
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
            {menuItems.map((item, index) => (
              <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
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
                    {item.icon}
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
        </Box>);
}