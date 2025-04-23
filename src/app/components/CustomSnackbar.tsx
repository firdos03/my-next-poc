'use client';

import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor } from '@mui/material/Alert';

interface CustomSnackbarProps {
    open: boolean;
    message: string;
    type: AlertColor;
    onClose: () => void;
    duration?: number;
}

const Alert = React.forwardRef<HTMLDivElement, any>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
    open,
    message,
    type,
    onClose,
    duration = 3000,
}) => {
    return (
        <Snackbar open={open} autoHideDuration={duration} onClose={onClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert onClose={onClose} severity={type} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default CustomSnackbar;
