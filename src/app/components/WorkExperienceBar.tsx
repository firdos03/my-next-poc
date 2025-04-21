'use client';
import React from 'react';
import { Box, Card, Typography } from '@mui/material';

interface Experience {
    companyName: string;
    years: number;
}

interface WorkExperienceBarProps {
    experience: Experience[];
}

const WorkExperienceBar: React.FC<WorkExperienceBarProps> = ({ experience }) => {
    const totalYears = experience.reduce((sum, exp) => sum + exp.years, 0);
    return (
        <>  <Typography variant="h6" fontWeight="bold" mb={2}>
            Work Experience Breakdown
        </Typography>
            <Card
                sx={{
                    p: 4,
                    background: 'linear-gradient(to right, #e3f2fd, #ffffff)',
                    borderRadius: 3,
                    boxShadow: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    // minHeight: 300,
                    overflow: 'visible',
                }}
            >
                <Box sx={{ width: '100%' }}>

                    <Typography fontWeight="bold" mb={2}>
                        Total Work Experience {totalYears} year{totalYears > 1 ? 's' : ''}
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            height: 40,
                            borderRadius: 2,
                            overflow: 'hidden',
                            boxShadow: 2,
                        }}
                    >
                        {experience.map((exp, index) => {
                            const widthPercent = (exp.years / totalYears) * 100;

                            const backgroundColors = ['#42a5f5', '#66bb6a', '#ffca28', '#ef5350', '#ab47bc'];

                            return (
                                <Box
                                    key={index}
                                    sx={{
                                        width: `${widthPercent}%`,
                                        backgroundColor: backgroundColors[index % backgroundColors.length],
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        color: '#fff',
                                        fontSize: '0.9rem',
                                        fontWeight: 600,
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {exp.companyName} ({exp.years} yr{exp.years > 1 ? 's' : ''})
                                </Box>
                            );
                        })}

                    </Box>
                </Box>

            </Card></>

    );
};

export default WorkExperienceBar;
