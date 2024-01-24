"use client";
import React from 'react';

const ProfilePageGender = ({ params }: any) => {
    return (
        <div className='flex items-center justify-center min-h-screen py-2'>
            <h1>ProfilePageGender</h1>
            <p>{params.gender}</p>
        </div>
    )
}

export default ProfilePageGender