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

const educationSchema = yup.object().shape({
    education: yup.array().of(
        yup.object().shape({
            degree: yup.string().required('Degree is required'),
            fieldOfStudy: yup.string().required('Field of Study is required'),
            completionYear: yup
                .number()
                .typeError('Must be a number')
                .min(1950, 'Year must be after 1950')
                .max(new Date().getFullYear() + 5, 'Enter a valid future year')
                .required('Completion Year is required'),
        })
    ),
});

type EducationFormValues = {
    education: {
        degree: string;
        fieldOfStudy: string;
        completionYear: number;
    }[];
};

const EducationForm = () => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<EducationFormValues>({
        resolver: yupResolver(educationSchema),
        defaultValues: {
            education: [{ degree: '', fieldOfStudy: '', completionYear: new Date().getFullYear() }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'education',
    });

    const onSubmit = (data: EducationFormValues) => {
        console.log('Education Data:', data);
        alert('Education details submitted!');
    };

    const lastIndex = fields.length - 1;
    const lastDegree = watch(`education.${lastIndex}.degree`);
    const lastField = watch(`education.${lastIndex}.fieldOfStudy`);
    const lastYear = watch(`education.${lastIndex}.completionYear`);

    const canAddMore =
        lastDegree?.trim() &&
        lastField?.trim() &&
        lastYear &&
        !isNaN(Number(lastYear)) &&
        Number(lastYear) >= 1950;

    return (
        <Container maxWidth="sm" sx={{ py: 6 }}>
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    background: 'linear-gradient(to right, #e3f2fd, #ffffff)',
                    borderRadius: 3,
                    boxShadow: 2,
                }}
            >
                <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
                    Educational Qualifications
                </Typography>
                <Typography variant="body2" textAlign="center" color="text.secondary" mb={3}>
                    You can add your degrees, field of study, and year of completion.
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
                                        label="Degree"
                                        fullWidth
                                        {...register(`education.${index}.degree`)}
                                        error={!!errors.education?.[index]?.degree}
                                        helperText={errors.education?.[index]?.degree?.message}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Field of Study"
                                        fullWidth
                                        {...register(`education.${index}.fieldOfStudy`)}
                                        error={!!errors.education?.[index]?.fieldOfStudy}
                                        helperText={
                                            errors.education?.[index]?.fieldOfStudy?.message
                                        }
                                    />
                                </Grid>
                                <Grid item xs={10}>
                                    <TextField
                                        label="Completion Year"
                                        type="number"
                                        fullWidth
                                        {...register(`education.${index}.completionYear`)}
                                        error={!!errors.education?.[index]?.completionYear}
                                        helperText={
                                            errors.education?.[index]?.completionYear?.message
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

                    {/* Add More Button */}
                    {canAddMore && (
                        <Box display="flex" justifyContent="flex-start" mb={3}>
                            <Button
                                onClick={() =>
                                    append({
                                        degree: '',
                                        fieldOfStudy: '',
                                        completionYear: new Date().getFullYear(),
                                    })
                                }
                                startIcon={<AddCircle />}
                                variant="outlined"
                                sx={{ width: 'fit-content' }}
                            >
                                Add More
                            </Button>
                        </Box>
                    )}

                    <Button type="submit" variant="contained" size="large" fullWidth>
                        Submit Education
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default EducationForm;
