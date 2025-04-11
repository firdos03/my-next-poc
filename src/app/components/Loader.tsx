'use client';
import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface LoaderProps {
    text?: string;
}

const Loader: React.FC<LoaderProps> = ({ text = 'Loading...' }) => {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                backgroundColor: '#f9f9f9',
            }}
        >
            <CircularProgress color="primary" size={50} />
            <Typography variant="body1" color="text.secondary">
                {text}
            </Typography>
        </Box>
    );
};

export default Loader;
