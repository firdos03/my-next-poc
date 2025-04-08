'use client';
import React from 'react';
import {
    Avatar,
    Box,
    Button,
    Card,
    Divider,
    Typography,
} from '@mui/material';
import WorkExperienceBar from './WorkExperienceBar';
import EducationDisplay from './EducationDisplay';
import SkillBubbleCard from './SkillSet';

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

    const skills = [
        { name: 'React', percent: 20 },
        { name: 'TypeScript', percent: 15 },
        { name: 'Node.js', percent: 10 },
        { name: 'Redux', percent: 10 },
        { name: 'MongoDB', percent: 10 },
        { name: 'HTML', percent: 10 },
        { name: 'CSS', percent: 10 },
        { name: 'Express', percent: 5 },
        { name: 'Git', percent: 5 },
        { name: 'Testing', percent: 5 },
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
            {/* Card */}
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

                {/* User Info */}
                <Box
                    sx={{
                        ml: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        flex: 2,
                    }}
                >
                    <Typography variant="h4" fontWeight="bold">
                        {user.fullName}
                    </Typography>
                    <Typography variant="h6">{user.designation}</Typography>
                    <Typography variant="body1" color="text.secondary">
                        Experience: {user.experience}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Location: {user.location}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Mobile: {user.mobile}
                    </Typography>
                    {/* 
                    <Button
                        variant="contained"
                        size="medium"
                        sx={{ width: 'fit-content', mt: 2 }}
                    >
                        Edit
                    </Button> */}
                </Box>

                {/* Vertical Divider */}
                <Divider orientation="vertical" flexItem sx={{ mx: 4, borderColor: '#bbb' }} />

                {/* Stats Section */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                    }}
                >
                    <Typography variant="h6" fontWeight="bold">
                        Jobs Applied
                    </Typography>
                    <Typography variant="h4" color="primary" mb={2}>
                        {user.jobsApplied}
                    </Typography>

                    <Typography variant="h6" fontWeight="bold">
                        Jobs Actioned
                    </Typography>
                    <Typography variant="h4" color="secondary">
                        {user.jobsActioned}
                    </Typography>
                </Box>
            </Card>

            {/* Work Experience Bar */}
            <Box sx={{ mt: 4, width: '90%', maxWidth: 1000 }}>
                <WorkExperienceBar experience={[
                    { companyName: 'Company A', years: 2 },
                    { companyName: 'Company B', years: 2 },
                    { companyName: 'Company C', years: 1 },
                ]} />
            </Box>

            {/* Education Section */}
            <Box sx={{ mt: 4, width: '90%', maxWidth: 1000 }}>
                <EducationDisplay />
            </Box>

            {/* Skill Bubble Chart */}
            <Box sx={{ mt: 4, width: '90%', maxWidth: 1000 }}>
                <SkillBubbleCard skills={skills} />
            </Box>
        </Box>
    );
};

export default UserProfile;
