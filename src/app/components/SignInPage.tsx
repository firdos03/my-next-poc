"use client";
import React from 'react';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Paper
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// ✅ Validation Schema
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

    const onSubmit = (data: any) => {
        console.log(data);
        alert('Sign in successful!');
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 4, mt: 6, borderRadius: 4, mb: 6 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Sign In
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                    {/* Email */}
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

                    {/* Password */}
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        {...register('password')}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        FormHelperTextProps={{
                            sx: {
                                color: 'red',
                                fontSize: '0.85rem',
                                marginLeft: "0px"
                            },
                        }}
                    />

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        sx={{ mt: 3, py: 1.5, fontWeight: 'bold' }}
                    >
                        Sign In
                    </Button>

                    {/* Sign Up Redirect */}
                    <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                        Don’t have an account?
                        <a href="#" style={{ color: '#1976d2', textDecoration: 'underline', marginLeft: '5px' }}>
                            Sign up
                        </a>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default SignInPage;
