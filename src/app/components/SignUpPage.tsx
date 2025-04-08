"use client";
import React from 'react';
import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    TextField,
    Typography,
    Paper,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// ✅ Validation Schema
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

    const onSubmit = (data: any) => {
        console.log(data);
        alert('Signup successful!');
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 4, mt: 6, borderRadius: 4 , mb:6}}>
                <Typography variant="h4" align="center" gutterBottom>
                    Create an Account
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                    {/* Full Name */}
                    <TextField
                        fullWidth
                        label="Full Name"
                        variant="outlined"
                        margin="normal"
                        {...register('fullName')}
                        error={!!errors.fullName}
                        helperText={errors.fullName?.message}
                        FormHelperTextProps={{
                            sx: {
                                color: 'red',
                                fontSize: '0.85rem',
                                marginLeft: "0px"
                            },
                        }}
                    />

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

                    {/* Confirm Password */}
                    <TextField
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        {...register('confirmPassword')}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                        FormHelperTextProps={{
                            sx: {
                                color: 'red',
                                fontSize: '0.85rem',
                                marginLeft: "0px"
                            },
                        }}
                    />

                    {/* Terms Checkbox */}
                    <FormControlLabel
                        control={<Checkbox {...register('terms')} color="primary" />}
                        label={
                            <Typography variant="body2">
                                I agree to the{' '}
                                <a href="#" style={{ color: '#1976d2', textDecoration: 'underline' }}>
                                    Terms and Conditions
                                </a>
                            </Typography>
                        }
                    />
                    {errors.terms && (
                        <Typography color="error" variant="body2">
                            {errors.terms.message}
                        </Typography>
                    )}

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        sx={{ mt: 3, py: 1.5, fontWeight: 'bold' }}
                    >
                        Sign Up
                    </Button>

                    {/* Login Redirect */}
                    <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                        Already have an account?
                        <a href="#" style={{ color: '#1976d2', textDecoration: 'underline' }}>
                            Log in
                        </a>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default SignUpPage;
