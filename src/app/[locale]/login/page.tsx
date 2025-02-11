"use client"
import React from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import '../../../styles/login.css';
import apiClient from '@/services';
export default function Login() {
  const t = useTranslations('login');
  return (
    <Container maxWidth={false} sx={{padding: '0 !important' }}>
      <div className="login-container">
        <div className="login-image"></div>
          <div className="login-form-container">
            <Typography variant="h4" component="h1" gutterBottom>
              {t('login')}
            </Typography>
            <form noValidate autoComplete="off">
              <TextField
                label={t('username')}
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <TextField
                label={t('password')}
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <Button variant="contained" color="primary" fullWidth>
                {t('login')}
              </Button>
              <Button variant="outlined" color="secondary" fullWidth style={{ marginTop: '10px' }}>
                {t('loginWithMetamask')}
              </Button>
          </form>
        </div>
      </div>
    </Container>
  );
} 