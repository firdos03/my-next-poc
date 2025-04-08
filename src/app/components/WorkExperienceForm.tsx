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
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddCircle, RemoveCircle } from '@mui/icons-material';

const schema = yup.object().shape({
    workExperience: yup.array().of(
        yup.object().shape({
            companyName: yup.string().required('Company name is required'),
            experience: yup
                .number()
                .typeError('Must be a number')
                .positive('Must be positive')
                .required('Experience is required'),
        })
    ),
});

type FormValues = {
    workExperience: {
        companyName: string;
        experience: number;
    }[];
};

const WorkExperienceForm = () => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            workExperience: [{ companyName: '', experience: 0 }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'workExperience',
    });

    const onSubmit = (data: FormValues) => {
        console.log('All Work Experiences:', data);
        alert('Experiences Submitted!');
    };

    // Watch the last item
    const lastItemIndex = fields.length - 1;
    const lastCompanyName = watch(`workExperience.${lastItemIndex}.companyName`);
    const lastExperience = watch(`workExperience.${lastItemIndex}.experience`);

    const canAddMore =
        lastCompanyName?.trim() !== '' &&
        lastExperience !== undefined &&
        !isNaN(Number(lastExperience)) &&
        Number(lastExperience) > 0;

    return (
        <Container maxWidth="sm" sx={{ py: 6 }}>
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    background: 'linear-gradient(to right, #e3f2fd, #ffffff)',
                    borderRadius: 3,
                }}
            >
                <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
                    Add Work Experience
                </Typography>
                <Typography variant="body2" textAlign="center" color="text.secondary" mb={3}>
                    You can add multiple companies and durations.
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
                                // backgroundColor: '#fafafa',
                            }}
                        >
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={12}>
                                    <TextField
                                        label="Company Name"
                                        fullWidth
                                        {...register(`workExperience.${index}.companyName`)}
                                        error={!!errors.workExperience?.[index]?.companyName}
                                        helperText={
                                            errors.workExperience?.[index]?.companyName?.message
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Years of Experience"
                                        type="number"
                                        fullWidth
                                        {...register(`workExperience.${index}.experience`)}
                                        error={!!errors.workExperience?.[index]?.experience}
                                        helperText={
                                            errors.workExperience?.[index]?.experience?.message
                                        }
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
                                    {fields.length > 1 && (
                                        <IconButton onClick={() => remove(index)} color="error">
                                            <RemoveCircle />
                                        </IconButton>
                                    )}
                                </Grid>
                            </Grid>
                        </Box>
                    ))}

                    {/* Conditionally show Add More button */}
                    {canAddMore && (
                        <Box display="flex" justifyContent="flex-start" mb={3}>
                            <Button
                                onClick={() => append({ companyName: '', experience: 0 })}
                                startIcon={<AddCircle />}
                                variant="outlined"
                                sx={{ width: 'fit-content' }}
                            >
                                Add More
                            </Button>
                        </Box>
                    )}

                    <Button type="submit" variant="contained" size="large" fullWidth>
                        Submit All Experience
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default WorkExperienceForm;
