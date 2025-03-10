"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import '../../../styles/login.css';
import apiClient from '@/services';
import { clearAllCookies } from "@/utils/cookie";
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme } from '@/styles/theme';
import LanguageSelector from '@/components/LanguageSelector';
import { API_LOGIN_URL } from '@/services/const';
import Link from 'next/link';

type FormData = {
  username: string;
  password: string;
};

export default function Login() {
  const t = useTranslations('login');
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
        clearAllCookies();
        const response = await apiClient.post(API_LOGIN_URL, formData);
        if (response.status === 200) {
          if(response.data.success === true){
            router.replace('/');
          }else{
            setError(t('loginError'));
          }
          
        } else {
          setError(t('loginError'));
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.response?.data?.message || t('loginError'));
    }
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <Container maxWidth={false} sx={{padding: '0 !important' }}>
        <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
          <LanguageSelector />
        </div>
        <div className="login-container">
          <div className="login-image"></div>
            <div className="login-form-container">
              <Typography variant="h4" component="h1" gutterBottom>
                {t('login')}
              </Typography>
              {error && (
                <Typography color="error" sx={{ mb: 2 }}>
                  {error}
                </Typography>
              )}
              <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                  label={t('username')}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
                <TextField
                  label={t('password')}
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <Button variant="contained" color="primary" fullWidth type="submit">
                  {t('login')}
                </Button>
                <Link href="/legacy/register" passHref>
                  <Button variant="outlined" color="secondary" fullWidth style={{ marginTop: '10px' }}>
                    {t('register')}
                  </Button>
                </Link>
            </form>
          </div>
        </div>
      </Container>
    </ThemeProvider>
  );
} 