'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackButton = () => {
    const router = useRouter();

    const handleClick = () => {
        router.back();
    };

    return (
        <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={handleClick}
            sx={{ mb: 2 }}
        >
            Back
        </Button>
    );
};

export default BackButton;
