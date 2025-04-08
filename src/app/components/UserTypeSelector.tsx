"use client";
import React from 'react';
import {
    Grid,
    Paper,
    Typography,
    Box,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';

interface Props {
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

const options = [
    {
        value: 'candidate',
        title: 'Candidate',
        description: 'Explore exciting job opportunities tailored for you.',
        icon: <PersonIcon fontSize="large" />,
    },
    {
        value: 'company',
        title: 'Company',
        description: 'Find and hire top talent to grow your business.',
        icon: <WorkIcon fontSize="large" />,
    },
];

const UserTypeSelector: React.FC<Props> = ({ value, onChange, error }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="#f3f4f6"
            px={2}
        >
            <Paper
                elevation={4}
                sx={{
                    width: '100%',
                    maxWidth: 700,
                    bgcolor: 'white',
                    boxShadow: 6,
                    borderRadius: 4,
                    p: 4,
                    textAlign: 'center',
                }}
            >
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Tell Us Who You Are
                </Typography>
                <Typography variant="body1" color="text.secondary" mb={3}>
                    Choose your role to get the best experience tailored to your needs.
                </Typography>

                <Grid
                    container
                    spacing={3}
                    direction={isMobile ? 'column' : 'row'}
                    justifyContent="center"
                    alignItems="stretch"
                >
                    {options.map((option) => {
                        const isSelected = value === option.value;

                        return (
                            <Grid item xs={12} sm={6} key={option.value}>
                                <Paper
                                    onClick={() => onChange(option.value)}
                                    elevation={isSelected ? 6 : 1}
                                    sx={{
                                        cursor: 'pointer',
                                        padding: 3,
                                        borderRadius: 3,
                                        border: isSelected
                                            ? `2px solid ${theme.palette.primary.main}`
                                            : '2px solid transparent',
                                        backgroundColor: isSelected ? theme.palette.action.hover : 'white',
                                        transition: 'all 0.3s ease',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        '&:hover': {
                                            boxShadow: 4,
                                        },
                                    }}
                                >
                                    <Box color={isSelected ? 'primary.main' : 'text.secondary'} mb={1}>
                                        {option.icon}
                                    </Box>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        {option.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" mt={1}>
                                        {option.description}
                                    </Typography>
                                </Paper>
                            </Grid>
                        );
                    })}
                </Grid>

                {error && (
                    <Typography sx={{ color: 'red', fontSize: '0.85rem', mt: 3 }}>
                        {error}
                    </Typography>
                )}
            </Paper>
        </Box>
    );
};

export default UserTypeSelector;
