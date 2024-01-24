"use client";
import React from 'react';
import { UserButton, useUser } from '@clerk/nextjs';

const Nav = () => {
    const { user, isLoaded } = useUser();
    return (
        <div>
            Nav
            {isLoaded && user ?
                <>
                    <UserButton afterSignOutUrl='/' />
                </> : ""}
        </div>
    )
}

export default Nav