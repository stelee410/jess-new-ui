'use client';
import {useTranslations} from 'next-intl';
import { Profile } from '@/types/profile';
import ProfileListShort from '@/components/profileListShort';
import ProfileList from '@/components/profileList';
import { Typography, Divider } from '@mui/material';
import { useState,useEffect } from 'react';
import apiClient from '@/services';
import { API_RECENT_CHAT,API_RECOMMEND_CHAT } from '@/services/const';

export default function Home() {
  const t = useTranslations('main');
  const [list, setList] = useState<Profile[]>([]);
  const [recommendList, setRecommendList] = useState<Profile[]>([]);
  useEffect(() => {
      apiClient.get(API_RECENT_CHAT).then((res) => {
        setList(res.data);
      }).catch((err) => {
        console.error(err);
      });
      apiClient.get(API_RECOMMEND_CHAT).then((res) => {
        setRecommendList(res.data);
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
        <ProfileList profiles={recommendList}/>
      </div>
  );
}