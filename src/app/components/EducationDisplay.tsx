import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';

const educationData = [
    {
        degree: 'B.Tech in Computer Science',
        year: '2021',
    },
    {
        degree: '12th - Science',
        year: '2017',
    },
    {
        degree: '10th - SSC',
        year: '2015',
    },
];

const EducationDisplay = () => {
    return (
        <Box sx={{ width: '100%' }}>
            <Typography variant="h5" fontWeight="bold" mb={2}>
                Education
            </Typography>
            <Grid container spacing={14}>
                {educationData.map((edu, index) => (
                    <Grid item xs={12} md={4} key={index}>
                        <Card
                            sx={{
                                background: 'linear-gradient(to right, #e3f2fd, #ffffff)',
                                borderRadius: 3,
                                boxShadow: 2,
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6" fontWeight="bold">
                                    {edu.degree}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Year of Completion: {edu.year}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default EducationDisplay;
