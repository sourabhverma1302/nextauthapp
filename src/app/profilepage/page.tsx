"use client";
import React from 'react';
import { useSearchParams } from 'next/navigation';

const ProfilePage = () => {
    const searchParams = useSearchParams();
    const username = searchParams.get('username');
    console.log("username prfile", username);
    console.log("profilepage");
    return (
        <div className='flex items-center justify-center min-h-screen py-2'>
            ProfilePage   {username}
        </div>
    )
}

export default ProfilePage