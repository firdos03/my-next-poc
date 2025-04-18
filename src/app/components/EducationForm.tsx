'use client';

import {
    Box,
    Button,
    Paper,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { Formik, FieldArray, getIn } from 'formik';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import { useState } from 'react';
import CustomDatePicker from './DatePicker'; // Reuse your existing component
import { AddCircle, Delete } from '@mui/icons-material';
import axios from 'axios';

const educationSchema = Yup.object().shape({
    degree: Yup.string().required('Degree is required'),
    institution: Yup.string().required('Institution is required'),
    startDate: Yup.date().required('Start date is required').typeError('Invalid start date'),
    endDate: Yup.date()
        .required('End date is required')
        .typeError('Invalid end date')
        .min(Yup.ref('startDate'), 'End date cannot be before start date'),
    fieldOfStudy: Yup.string(),
    grade: Yup.string(),
    description: Yup.string(),
});

const validationSchema = Yup.object().shape({
    education: Yup.array().of(educationSchema),
});

const initialEducation = {
    degree: '',
    institution: '',
    startDate: dayjs(),
    endDate: dayjs(),
    fieldOfStudy: '',
    grade: '',
    description: '',
};

export default function EducationForm() {
    const [submittedData, setSubmittedData] = useState<any>(null);

    return (
        <Box>
            <Paper elevation={3} sx={{ p: 4, maxWidth: 700, mx: 'auto', mt: 5 }}>
                <Typography variant="h5" gutterBottom>
                    Education Details
                </Typography>

                <Formik
                    initialValues={{ education: [initialEducation] }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { resetForm }) => {
                        try {
                            const res = await axios.post('/api/education', values.education, {
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZjdjNWU3YWE5MGVlOWNkYzEwNmE3NyIsImVtYWlsIjoidGVzdDAxQG1haWwuY29tIiwiaWF0IjoxNzQ0MzUxMjA0LCJleHAiOjE3NDQ5NTYwMDR9.yjCoF5I9b1D4BYir9N9Vx2JIFJ_UGyYrBYgUi2Lsl0c"}`,

                                },
                            });

                            if (!res.data) throw new Error('Failed to submit data');
                            setSubmittedData(values.education);
                            resetForm();
                        } catch (err) {
                            console.error('Error submitting education:', err);
                        }
                    }}
                >
                    {({ values, handleChange, handleSubmit, setFieldValue, touched, errors }) => (
                        <form onSubmit={handleSubmit}>
                            <FieldArray name="education">
                                {({ push, remove }) => (
                                    <Stack spacing={4}>
                                        {values.education.map((item, index) => {
                                            const fieldName = `education.${index}`;
                                            return (
                                                <Paper
                                                    key={index}
                                                    elevation={2}
                                                    sx={{ p: 3, position: 'relative' }}
                                                >
                                                    <Stack spacing={2}>
                                                        <TextField
                                                            label="Degree"
                                                            name={`${fieldName}.degree`}
                                                            fullWidth
                                                            value={item.degree}
                                                            onChange={handleChange}
                                                            error={Boolean(getIn(errors, `${fieldName}.degree`) && getIn(touched, `${fieldName}.degree`))}
                                                            helperText={getIn(touched, `${fieldName}.degree`) && getIn(errors, `${fieldName}.degree`)}
                                                        />

                                                        <TextField
                                                            label="Institution"
                                                            name={`${fieldName}.institution`}
                                                            fullWidth
                                                            value={item.institution}
                                                            onChange={handleChange}
                                                            error={Boolean(getIn(errors, `${fieldName}.institution`) && getIn(touched, `${fieldName}.institution`))}
                                                            helperText={getIn(touched, `${fieldName}.institution`) && getIn(errors, `${fieldName}.institution`)}
                                                        />

                                                        <TextField
                                                            label="Field of Study"
                                                            name={`${fieldName}.fieldOfStudy`}
                                                            fullWidth
                                                            value={item.fieldOfStudy}
                                                            onChange={handleChange}
                                                        />

                                                        <TextField
                                                            label="Grade"
                                                            name={`${fieldName}.grade`}
                                                            fullWidth
                                                            value={item.grade}
                                                            onChange={handleChange}
                                                        />

                                                        <CustomDatePicker
                                                            label="Start Date"
                                                            name={`${fieldName}.startDate`}
                                                            value={item.startDate}
                                                            formik={{ setFieldValue, errors, touched }}
                                                        />

                                                        <CustomDatePicker
                                                            label="End Date"
                                                            name={`${fieldName}.endDate`}
                                                            value={item.endDate}
                                                            formik={{ setFieldValue, errors, touched }}
                                                        />

                                                        <TextField
                                                            label="Description"
                                                            name={`${fieldName}.description`}
                                                            fullWidth
                                                            multiline
                                                            minRows={2}
                                                            value={item.description}
                                                            onChange={handleChange}
                                                        />

                                                        {index > 0 && (
                                                            <Button
                                                                onClick={() => remove(index)}
                                                                size="small"
                                                                variant="outlined"
                                                                color="error"
                                                                startIcon={<Delete />}
                                                            >
                                                                Remove
                                                            </Button>
                                                        )}
                                                    </Stack>
                                                </Paper>
                                            );
                                        })}

                                        <Box display="flex" justifyContent="flex-start">
                                            <Button
                                                variant="outlined"
                                                startIcon={<AddCircle />}
                                                onClick={() => push(initialEducation)}
                                            >
                                                Add More Education
                                            </Button>
                                        </Box>

                                        <Button type="submit" variant="contained" color="primary">
                                            Submit All Educations
                                        </Button>
                                    </Stack>
                                )}
                            </FieldArray>
                        </form>
                    )}
                </Formik>
            </Paper>

            {submittedData && (
                <Box mt={5}>
                    <Typography variant="h6" textAlign="center">
                        Submitted Data:
                    </Typography>
                    <pre>{JSON.stringify(submittedData, null, 2)}</pre>
                </Box>
            )}
        </Box>
    );
}
