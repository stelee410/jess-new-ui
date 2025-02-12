"use client"
import React from 'react';
import { Avatar } from "@mui/material";
import Link from 'next/link'; 
import { Profile } from '@/types/profile';

const ProfileListShort = ({ list }: {list:Profile[]}) => {
    return (
        <div style={{ display: 'flex' }}>
            {list.map((profile, index) => (
                <div key={index}>
                    <Link href={`chat/${profile.name}`}>
                        <Avatar 
                        alt={profile.name} 
                        src={profile.avatar} 
                        sx={{ width: 56, height: 56, margin: 1 }}
                        />
                    </Link>
                </div>
            ))}
        </div>
    );
  };
  
  export default ProfileListShort;