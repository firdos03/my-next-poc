"use client";
import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Container,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
    Paper,
    CircularProgress
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CustomSnackbar from '../components/CustomSnackbar';

const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
});

const SignInPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        type: 'success' as 'success' | 'error',
    });

    useEffect(() => {
        if (redirect) {
            router.push('/userprofileform');
        }
    }, [redirect, router]);

    const handleClickShowPassword = () => setShowPassword((prev) => !prev);

    const onSubmit = async (data: any) => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                setSnackbar({ open: true, message: 'Sign in successful!', type: 'success' });
                localStorage.setItem("token", result.token);
                localStorage.setItem("userId", result.user.id);
                setRedirect(true)
            } else {
                setSnackbar({ open: true, message: 'Sign in failed!', type: 'error' });
            }
        } catch (error) {
            console.error('Network error:', error);
            alert('Something went wrong. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 4, mt: 6, borderRadius: 4, mb: 6 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Sign In
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                    <TextField
                        fullWidth
                        label="Email Address"
                        variant="outlined"
                        margin="normal"
                        {...register('email')}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        FormHelperTextProps={{
                            sx: {
                                color: 'red',
                                fontSize: '0.85rem',
                                marginLeft: "0px"
                            },
                        }}
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        variant="outlined"
                        margin="normal"
                        {...register('password')}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleClickShowPassword} edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        FormHelperTextProps={{
                            sx: {
                                color: 'red',
                                fontSize: '0.85rem',
                                marginLeft: "0px"
                            },
                        }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        sx={{ mt: 3, py: 1.5, fontWeight: 'bold' }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Sign In'}
                    </Button>

                    <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                        Don’t have an account?
                        <Link href="/signup" style={{ color: '#1976d2', textDecoration: 'underline' }}>
                            Sign up
                        </Link>
                    </Typography>
                </Box>
            </Paper>
            <CustomSnackbar
                open={snackbar.open}
                message={snackbar.message}
                type={snackbar.type}
                onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
            />
        </Container>
    );
};

export default SignInPage;
