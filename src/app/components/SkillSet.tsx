'use client';
import React from 'react';
import { Box, Typography, Card, Tooltip } from '@mui/material';

interface Skill {
    name?: string;
    percent?: number;
}

const colors = ['#f4c542', '#e74c3c', '#e67e22', '#3498db', '#9b59b6', '#1abc9c', '#2ecc71', '#34495e', '#16a085', '#d35400'];

const SkillBubbleCard = ({ skills }: { skills: Skill[] }) => {
    const paddedSkills = [...skills];

    while (paddedSkills.length < 10) {
        paddedSkills.push({});
    }

    return (
        <>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h6" fontWeight="bold">
                    Skill Set
                </Typography>
            </Box>

            <Card
                sx={{
                    p: 4,
                    background: 'linear-gradient(to right, #f0f4f8, #ffffff)',
                    borderRadius: 3,
                    boxShadow: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 450,
                    overflow: 'visible',
                    position: 'relative',
                }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(5, 1fr)',
                        gridTemplateRows: 'repeat(2, 1fr)',
                        gap: 2,
                        justifyItems: 'center',
                        alignItems: 'center',
                    }}
                >
                    {paddedSkills.map((skill, index) => {
                        const percent = skill.percent || 0;
                        const size = Math.max(80, percent * 2); // scale size
                        const color = colors[index % colors.length];
                        const hasData = !!skill.name;

                        return (
                            <Tooltip
                                key={index}
                                title={hasData ? `${skill.name} - ${percent}%` : 'No Data'}
                                arrow
                                placement="top"
                            >
                                <Box
                                    sx={{
                                        width: size,
                                        height: size,
                                        backgroundColor: color,
                                        borderRadius: '50%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        boxShadow: '4px 4px 12px rgba(0, 0, 0, 0.1)',
                                        textAlign: 'center',
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                        '&:hover': {
                                            transform: 'scale(1.1)',
                                            boxShadow: '6px 6px 15px rgba(0, 0, 0, 0.15)',
                                        },
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: 'bold',
                                            color: '#fff',
                                            fontSize: '0.85rem',
                                            lineHeight: 1.2,
                                        }}
                                    >
                                        {hasData ? skill.name : 'No Data'}
                                    </Typography>
                                    {hasData && (
                                        <Typography
                                            sx={{
                                                color: '#fff',
                                                fontSize: '0.75rem',
                                                opacity: 0.9,
                                            }}
                                        >
                                            {percent}%
                                        </Typography>
                                    )}
                                </Box>
                            </Tooltip>
                        );
                    })}
                </Box>
            </Card>
        </>
    );
};

export default SkillBubbleCard;
