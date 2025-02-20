'use client';
import {useTranslations} from 'next-intl';
import { Profile } from '@/types/profile';
import ProfileListShort from '@/components/profileListShort';
import ProfileList from '@/components/profileList';
import { Typography, Divider } from '@mui/material';
import { useState,useEffect } from 'react';
import apiClient from '@/services';
import { API_RECENT_CHAT,API_RECOMMEND_CHAT,API_PRIVATE_CHAT } from '@/services/const';
import { CircularProgress } from '@mui/material';

export default function Home() {
  const t = useTranslations('main');
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<Profile[]>([]);
  const [recommendList, setRecommendList] = useState<Profile[]>([]);
  const [privateChat, setPrivateChat] = useState<Profile[]>([]);
  useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try{
          const recentRes = await apiClient.get(API_RECENT_CHAT);
          setList(recentRes.data);
          const recommendRes = await apiClient.get(API_RECOMMEND_CHAT);
          setRecommendList(recommendRes.data);
          const privateRes = await apiClient.get(API_PRIVATE_CHAT);
          setPrivateChat(privateRes.data);
        }catch(err){
          console.error(err);
        }finally{
          setLoading(false);
        }
      }
     fetchData();
  }, []);
  return (
      <div>
         {loading && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}>
            <CircularProgress />
          </div>
          )}
        <Typography variant="h5" sx={{ mb: 1 , marginBottom: 2}}>
          {t('recentlyChat')}
        </Typography>
        <ProfileListShort list={list}/>
        <Divider/>
        <Typography variant="h5" sx={{ mb: 1 , marginTop: 2, marginBottom: 2}}>
          {t('discover')}
        </Typography >
        <ProfileList profiles={recommendList} />
        <Divider/>
        <Typography variant="h5" sx={{ mb: 1 , marginTop: 2, marginBottom: 2}}>
          {t('privateChat')}
        </Typography >
        <ProfileList profiles={privateChat}/>
      </div>
  );
}