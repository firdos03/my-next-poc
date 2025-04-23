'use client';
import React from 'react';
import { Box, Card, Typography } from '@mui/material';

interface Experience {
    company: string;
    startDate: string;
    endDate: string;
    currentlyWorking: boolean;
}

interface WorkExperienceBarProps {
    experience: Experience[];
}

const WorkExperienceBar: React.FC<WorkExperienceBarProps> = ({ experience }) => {
    const msToYears = (ms: number) => ms / (1000 * 60 * 60 * 24 * 365);

    let totalExperienceInMs = 0;
    const companyExperienceMap: Record<string, number> = {};

    experience.forEach((exp) => {
        const start = new Date(exp.startDate);
        const end = exp.currentlyWorking ? new Date() : new Date(exp.endDate);
        const duration = end.getTime() - start.getTime();

        totalExperienceInMs += duration;

        if (companyExperienceMap[exp.company]) {
            companyExperienceMap[exp.company] += duration;
        } else {
            companyExperienceMap[exp.company] = duration;
        }
    });

    const totalYears = Number(msToYears(totalExperienceInMs).toFixed(2));
    const backgroundColors = ['#42a5f5', '#66bb6a', '#ffca28', '#ef5350', '#ab47bc'];

    return (
        <>
            <Typography variant="h6" fontWeight="bold" mb={2}>
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
                    overflow: 'visible',
                }}
            >
                <Box sx={{ width: '100%' }}>
                    <Typography fontWeight="bold" mb={2}>
                        Total Work Experience: {totalYears} year{totalYears !== 1 ? 's' : ''}
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
                        {Object.entries(companyExperienceMap).map(([company, ms], index) => {
                            const percent = (ms / totalExperienceInMs) * 100;
                            return (
                                <Box
                                    key={index}
                                    sx={{
                                        width: `${percent}%`,
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
                                    {company} ({msToYears(ms).toFixed(2)}y)
                                </Box>
                            );
                        })}
                    </Box>
                </Box>
            </Card>
        </>
    );
};

export default WorkExperienceBar;
