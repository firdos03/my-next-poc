'use client';
import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Checkbox,
    CircularProgress,
    Container,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Paper,
    TextField,
    Typography
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import CustomSnackbar from '../components/CustomSnackbar';

const schema = yup.object().shape({
    fullName: yup.string().required('Full Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
    terms: yup.boolean().oneOf([true], 'You must agree to the terms'),
});

const SignUpPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        type: 'success' as 'success' | 'error',
    });
    const router = useRouter();


    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    useEffect(() => {
        if (redirect) {
            router.push('/signin');
        }
    }, [redirect, router]);

    const onSubmit = async (data: any) => {
        setLoading(true);
        try {
            
            const response = await fetch('http://localhost:3000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                setRedirect(true);
                setSnackbar({ open: true, message: 'Signup successful!', type: 'success' });
                console.log('Success:', result);

            } else {
                setSnackbar({ open: true, message: result.message || 'Signup failed!', type: 'error' });
            }
        } catch (error) {
            console.error('Network error:', error);
            alert('Something went wrong. Please try again later.');
            setSnackbar({ open: true, message: 'Something went wrong. Please try again later.', type: 'success' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 4, mt: 6, borderRadius: 4, mb: 6 }}>

                <Typography variant="h4" align="center" gutterBottom>
                    Create an Account
                </Typography>

                <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                    <TextField
                        fullWidth
                        label="Full Name"
                        variant="outlined"
                        margin="normal"
                        {...register('fullName')}
                        error={!!errors.fullName}
                        helperText={errors.fullName?.message}
                        FormHelperTextProps={{
                            sx: { color: 'red', fontSize: '0.85rem', marginLeft: "0px" },
                        }}
                    />

                    <TextField
                        fullWidth
                        label="Email Address"
                        variant="outlined"
                        margin="normal"
                        {...register('email')}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        FormHelperTextProps={{
                            sx: { color: 'red', fontSize: '0.85rem', marginLeft: "0px" },
                        }}
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        margin="normal"
                        {...register('password')}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={togglePasswordVisibility} edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        FormHelperTextProps={{
                            sx: { color: 'red', fontSize: '0.85rem', marginLeft: "0px" },
                        }}
                    />

                    <TextField
                        fullWidth
                        label="Confirm Password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        variant="outlined"
                        margin="normal"
                        {...register('confirmPassword')}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={toggleConfirmPasswordVisibility} edge="end">
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        FormHelperTextProps={{
                            sx: { color: 'red', fontSize: '0.85rem', marginLeft: "0px" },
                        }}
                    />

                    <FormControlLabel
                        control={<Checkbox {...register('terms')} color="primary" />}
                        label={
                            <>
                                <Typography variant="body2" component="span">
                                    I agree to the{' '}
                                    <a href="#" style={{ color: '#1976d2', textDecoration: 'underline' }}>
                                        Terms and Conditions
                                    </a>
                                </Typography>
                            </>
                        }
                    />
                    {errors.terms && (
                        <Typography color="error" variant="body2">
                            {errors.terms.message}
                        </Typography>
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        sx={{ mt: 3, py: 1.5, fontWeight: 'bold' }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Sign Up'}
                    </Button>

                    <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                        Already have an account?{' '}
                        <Link href="/signin" style={{ color: '#1976d2', textDecoration: 'underline' }}>
                            Log in
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

export default SignUpPage;
