'use client';
import {useTranslations} from 'next-intl';
import { Profile } from '@/types/profile';
import ProfileListShort from '@/components/profileListShort';
import ProfileList from '@/components/profileList';
import { Typography, Divider } from '@mui/material';
import { useState,useEffect } from 'react';
import apiClient from '@/services';

export default function Home() {
  const t = useTranslations('main');
  const [list, setList] = useState<Profile[]>([]);
  useEffect(() => {
      apiClient.get('/profile/list').then((res) => {
        setList(res.data);
      }).catch((err) => {
        console.error(err);
      });
  }, []);
  return (
      <div>
        <Typography variant="body1" sx={{ mb: 1 }}>
          {t('recentlyChat')}
        </Typography>
        <ProfileListShort list={list}/>
        <Divider/>
        <Typography variant="body1" sx={{ mb: 1 }}>
          {t('discover')}
        </Typography >
        <ProfileList profiles={list}/>
      </div>
  );
}