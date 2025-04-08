'use client';

import React from 'react';
import {
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import { useForm, useFieldArray } from 'react-hook-form';
import { AddCircle, RemoveCircle } from '@mui/icons-material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const skillSchema = yup.object().shape({
    skills: yup
        .array()
        .of(
            yup.object().shape({
                name: yup.string().required('Skill name is required'),
                percentage: yup
                    .number()
                    .typeError('Must be a number')
                    .min(1, 'Min 1%')
                    .max(100, 'Max 100%')
                    .required('Percentage is required'),
            })
        )
        .min(5, 'Minimum 5 skills are required')
        .max(10, 'Maximum 10 skills allowed'),
});

type SkillFormValues = {
    skills: {
        name: string;
        percentage: number;
    }[];
};

const SkillSetForm = () => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<SkillFormValues>({
        resolver: yupResolver(skillSchema),
        defaultValues: {
            skills: Array.from({ length: 5 }, () => ({ name: '', percentage: 0 })),
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'skills',
    });

    const onSubmit = (data: SkillFormValues) => {
        console.log('Skill Set:', data);
        alert('Skills Submitted!');
    };

    const lastIndex = fields.length - 1;
    const lastName = watch(`skills.${lastIndex}.name`);
    const lastPercentage = watch(`skills.${lastIndex}.percentage`);
    const canAddMore =
        fields.length < 10 &&
        lastName?.trim() !== '' &&
        lastPercentage !== undefined &&
        !isNaN(Number(lastPercentage)) &&
        Number(lastPercentage) > 0;

    return (
        <Container maxWidth="sm" sx={{ py: 6 }}>
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    background: 'linear-gradient(to right, #f3e5f5, #ffffff)',
                    borderRadius: 3,
                }}
            >
                <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
                    Skill Set
                </Typography>
                <Typography variant="body2" textAlign="center" color="text.secondary" mb={3}>
                    Add 5 to 10 skills with their proficiency level.
                </Typography>

                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                    {fields.map((item, index) => (
                        <Box
                            key={item.id}
                            sx={{
                                mb: 2,
                                p: 2,
                                border: '1px solid #ccc',
                                borderRadius: 2,
                            }}
                        >
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={12}>
                                    <TextField
                                        label="Skill Name"
                                        fullWidth
                                        {...register(`skills.${index}.name`)}
                                        error={!!errors.skills?.[index]?.name}
                                        helperText={errors.skills?.[index]?.name?.message}
                                    />
                                </Grid>
                                <Grid item xs={10}>
                                    <TextField
                                        label="Proficiency (%)"
                                        type="number"
                                        fullWidth
                                        inputProps={{ min: 1, max: 100 }}
                                        {...register(`skills.${index}.percentage`)}
                                        error={!!errors.skills?.[index]?.percentage}
                                        helperText={errors.skills?.[index]?.percentage?.message}
                                        InputProps={{
                                            inputProps: {
                                                style: {
                                                    MozAppearance: 'textfield',
                                                },
                                            },
                                            sx: {
                                                '& input[type=number]::-webkit-outer-spin-button': {
                                                    WebkitAppearance: 'none',
                                                    margin: 0,
                                                },
                                                '& input[type=number]::-webkit-inner-spin-button': {
                                                    WebkitAppearance: 'none',
                                                    margin: 0,
                                                },
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={2} sx={{ textAlign: 'center' }}>
                                    {fields.length > 5 && (
                                        <IconButton onClick={() => remove(index)} color="error">
                                            <RemoveCircle />
                                        </IconButton>
                                    )}
                                </Grid>
                            </Grid>
                        </Box>
                    ))}

                    {/* Conditionally render Add More */}
                    {canAddMore && (
                        <Box display="flex" justifyContent="flex-start" mb={3}>
                            <Button
                                onClick={() => append({ name: '', percentage: 0 })}
                                startIcon={<AddCircle />}
                                variant="outlined"
                                sx={{ width: 'fit-content' }}
                            >
                                Add More
                            </Button>
                        </Box>
                    )}

                    {typeof errors.skills?.message === 'string' && (
                        <Typography color="error" sx={{ mb: 2 }}>
                            {errors.skills.message}
                        </Typography>
                    )}

                    <Button type="submit" variant="contained" size="large" fullWidth>
                        Submit Skills
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default SkillSetForm;
