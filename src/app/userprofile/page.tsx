'use client';
import React from 'react';
import { Avatar, Box, Card, Divider, Typography } from '@mui/material';
import WorkExperienceBar from '../components/WorkExperienceBar';
import EducationDisplay from '../components/EducationDisplay';
import SkillBubbleCard from '../components/SkillSet';

const UserProfile = () => {


    const userId = localStorage.getItem("userId");

    console.log("userId", userId);

    const user = {
        fullName: 'John Doe',
        designation: 'Frontend Developer',
        location: 'Mumbai',
        mobile: '9876543210',
        profileImage: '/profile.jpg',
        jobsApplied: 24,
        jobsActioned: 12,
    };

    const experienceData = [
        { companyName: "Company A", years: 3 },
        { companyName: "Company B", years: 2 },
        { companyName: "Company C", years: 4 },
    ];

    const skillsData = [
        { name: 'React', percent: 85 },
        { name: 'JavaScript', percent: 90 },
        { name: 'Node.js', percent: 75 },
        { name: 'CSS', percent: 80 },
        { name: 'TypeScript', percent: 70 },
        { name: 'React', percent: 83 },
        { name: 'JavaScript', percent: 99 },
        { name: 'Node.js', percent: 25 },
        { name: 'CSS', percent: 12 },
        { name: 'TypeScript', percent: 32 },
    ];

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
                    width: '100%',
                    maxWidth: 1000,
                    height: 'auto',
                    p: 4,
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                    background: 'linear-gradient(to right, #e0f7fa, #ffffff)',
                    borderRadius: 4,
                    boxShadow: 3,
                }}
            >
                <Box sx={{ flexShrink: 0, mb: { xs: 2, md: 0 } }}>
                    <Avatar
                        src={user.profileImage}
                        alt={user.fullName}
                        sx={{ width: 120, height: 120, mb: 2 }}
                    />
                </Box>

                <Divider orientation="vertical" flexItem sx={{ mx: { xs: 0, md: 4 }, borderColor: '#bbb' }} />

                <Box sx={{ textAlign: { xs: 'center', md: 'left' }, mb: { xs: 2, md: 0 } }}>
                    <Typography variant="h5" fontWeight="bold">
                        {user.fullName}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        {user.designation}
                    </Typography>
                    <Typography variant="body1">Location: {user.location}</Typography>
                    <Typography variant="body1">Mobile: {user.mobile}</Typography>
                </Box>

                <Divider orientation="vertical" flexItem sx={{ mx: { xs: 0, md: 4 }, borderColor: '#bbb' }} />

                <Box sx={{ display: "flex", flexDirection: 'column', alignItems: 'center', width: { xs: '100%', md: '30%' } }}>
                    <Typography variant="h6" fontWeight={500}>Jobs Applied: {user.jobsApplied}</Typography>
                    <Typography variant="h6" fontWeight={500}>Jobs Actioned: {user.jobsActioned}</Typography>
                </Box>
            </Card>

            <Box sx={{ width: "100%", padding: "20px 80px", mt: 4 }}>
                <WorkExperienceBar experience={experienceData} />
            </Box>

            <Box sx={{ width: "100%", padding: "20px 80px", mt: 4 }}>
                <EducationDisplay />
            </Box>

            <Box sx={{ width: "100%", padding: "20px 80px", mt: 4, height: "600px" }}>
                <SkillBubbleCard skills={skillsData} />
            </Box>
        </Box>
    );
};

export default UserProfile;
