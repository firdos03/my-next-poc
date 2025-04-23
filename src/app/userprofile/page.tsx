'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { Avatar, Box, Card, Divider, Typography } from '@mui/material';
import WorkExperienceBar from '../components/WorkExperienceBar';
import EducationDisplay from '../components/EducationDisplay';
import SkillBubbleCard from '../components/SkillSet';
import axios from 'axios';
import Loader from '../components/Loader';
import CustomSnackbar from '../components/CustomSnackbar';

const UserProfile = () => {
    const [userProfile, setUserProfile] = useState<any>([])
    const [userExperience, setUserExperience] = useState<any>([]);
    const [userEducation, setUserEducation] = useState<any>([]);
    const [userSkills, setUserSkills] = useState<any>([]);

    const [loading, setLoading] = useState<boolean>(true);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        type: 'error' as 'success' | 'error',
    });


    const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const fetchUserData = useCallback(async () => {
        try {
            const res = await axios.get(
                `http://localhost:3000/api/userfullprofile?userId=${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (res.data.profile) {
                setUserProfile([res.data.profile]);
            } else {
                setUserProfile([]);
            }
            setUserExperience(res.data.experiences || []);
            setUserEducation(res.data.education || []);
            setUserSkills(res.data.skills || []);
            setSnackbar({ open: true, message: 'Profile loaded successfully.', type: 'success' });
        } catch (error) {
            setSnackbar({ open: true, message: 'Failed to fetch user data.', type: 'error' });
        } finally {
            setLoading(false);
        }
    }, [token, userId]);

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    if (loading) {
        return (
            <Loader />
        );
    }

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
            <Box sx={{ width: "100%", padding: "20px 80px", mt: 4 }}>
                <Card
                    sx={{
                        width: '100%',
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

                    {userProfile.map((element: any) => {
                        return (
                            <><Box sx={{ flexShrink: 0, mb: { xs: 2, md: 0 } }}>
                                <Avatar
                                    src={"sample.com"}
                                    alt={element.fullName && element.fullName.toUpperCase()}
                                    sx={{ width: 120, height: 120, mb: 2 }}
                                />
                            </Box>

                                <Divider orientation="vertical" flexItem sx={{ mx: { xs: 0, md: 4 }, borderColor: '#bbb' }} />

                                <Box sx={{ textAlign: { xs: 'center', md: 'left' }, mb: { xs: 2, md: 0 } }}>
                                    <Typography variant="h5" fontWeight="bold">
                                        {element.fullName}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary">
                                        {element.designation}
                                    </Typography>
                                    <Typography variant="body1">Location: {element.location}</Typography>
                                    <Typography variant="body1">Mobile: {element.mobileNumber}</Typography>
                                </Box></>
                        )
                    })}

                    <Divider orientation="vertical" flexItem sx={{ mx: { xs: 0, md: 4 }, borderColor: '#bbb' }} />

                    <Box sx={{ display: "flex", flexDirection: 'column', alignItems: 'center', width: { xs: '100%', md: '30%' } }}>
                        <Typography variant="h6" fontWeight={500}>Jobs Applied: {user.jobsApplied}</Typography>
                        <Typography variant="h6" fontWeight={500}>Jobs Actioned: {user.jobsActioned}</Typography>
                    </Box>

                </Card>
            </Box>

            <Box sx={{ width: "100%", padding: "20px 80px", mt: 4 }}>
                <WorkExperienceBar experience={userExperience || experienceData} />
            </Box>

            <Box sx={{ width: "100%", padding: "20px 80px", mt: 4 }}>
                <EducationDisplay userEducation={userEducation} />
            </Box>

            <Box sx={{ width: "100%", padding: "20px 80px", mt: 4, height: "600px" }}>
                <SkillBubbleCard skills={userSkills || skillsData} />
            </Box>

            <CustomSnackbar
                open={snackbar.open}
                message={snackbar.message}
                type={snackbar.type}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            />
        </Box>
    );
};

export default UserProfile;
