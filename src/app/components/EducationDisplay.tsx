import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';

const EducationDisplay = ({ userEducation }: any) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Typography variant="h5" fontWeight="bold" mb={2}>
                Education
            </Typography>
            <Grid container spacing={14}>
                {userEducation.map((element: any, index: number) => (
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
                                    {`${element.degree} in ${element.fieldOfStudy}`}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Year of Completion:  {new Date(element.endDate).getFullYear()}
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
