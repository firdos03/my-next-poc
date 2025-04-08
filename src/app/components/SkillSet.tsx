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
        <>   <Box sx={{ mb: 3 }}>
            <Typography variant="h6" fontWeight="bold">
                Skill Set
            </Typography>
        </Box>
            <Card
                sx={{
                    p: 4,
                    background: 'linear-gradient(to right, #e3f2fd, #ffffff)',
                    borderRadius: 3,
                    boxShadow: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 300,
                    overflow: 'visible',
                }}
            >
                {/* Left-Aligned Heading */}


                {/* Bubble Graph */}
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: 300,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {paddedSkills.map((skill, index) => {
                        const percent = skill.percent || 0;
                        const size = Math.max(100, percent * 3); // scale size
                        const color = colors[index % colors.length];
                        const hasData = !!skill.name;

                        const angle = (index / 10) * 360;
                        const radius = 100;
                        const x = radius * Math.cos((angle * Math.PI) / 180);
                        const y = radius * Math.sin((angle * Math.PI) / 180);

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
                                        position: 'absolute',
                                        top: `calc(50% + ${y}px - ${size / 2}px)`,
                                        left: `calc(50% + ${x}px - ${size / 2}px)`,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        boxShadow: '4px 4px 0 rgba(0,0,0,0.15)',
                                        textAlign: 'center',
                                        px: 1,
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                        '&:hover': {
                                            transform: 'scale(1.1)',
                                            boxShadow: '6px 6px 10px rgba(0,0,0,0.2)',
                                            zIndex: 10,
                                        },
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: 'bold',
                                            color: '#fff',
                                            fontSize: '0.9rem',
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
            </Card></>
    );
};

export default SkillBubbleCard;
