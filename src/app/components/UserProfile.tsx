'use client';
import React, { useEffect } from 'react';
import {
    Avatar,
    Box,
    Card,
    Divider,
} from '@mui/material';
import axios from "axios"


const UserProfile = () => {
    const user = {
        fullName: 'John Doe',
        designation: 'Frontend Developer',
        experience: '3 years',
        location: 'Mumbai',
        mobile: '9876543210',
        profileImage: '/profile.jpg',
        jobsApplied: 24,
        jobsActioned: 12,
    };


    // useEffect(()=>{
    //     const fetchUserData = async () =>{
    //         const result = await axios.get("http://localhost:3000/api/userprofile")
    //     }

    // },[])



    return (
        <Box
            sx={{
                minHeight: '100vh',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#f5f5f5',
                p: 2,
            }}
        >
            <Card
                sx={{
                    width: '90%',
                    maxWidth: 1000,
                    height: 300,
                    p: 4,
                    display: 'flex',
                    alignItems: 'center',
                    background: 'linear-gradient(to right, #e0f7fa, #ffffff)',
                    borderRadius: 4,
                    boxShadow: 3,
                }}
            >
                {/* Profile Image */}
                <Box sx={{ flexShrink: 0 }}>
                    <Avatar
                        src={user.profileImage}
                        alt={user.fullName}
                        sx={{ width: 120, height: 120, mr: 4 }}
                    />
                </Box>
                <Divider orientation="vertical" flexItem sx={{ mx: 4, borderColor: '#bbb' }} />
            </Card>
        </Box>
    );
};

export default UserProfile;
