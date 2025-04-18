'use client';

import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Paper,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { Formik, FieldArray, getIn } from 'formik';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import { useState } from 'react';
import { AddCircle, Delete } from '@mui/icons-material';
import axios from 'axios';
import CustomDatePicker from '../components/DatePicker';
import { useRouter } from 'next/navigation';

const workExperienceSchema = Yup.object().shape({
    company: Yup.string()
        .required('Company name is required')
        .min(2, 'Company name must be at least 2 characters'),
    jobTitle: Yup.string()
        .required('Job title is required')
        .min(2, 'Job title must be at least 2 characters'),
    startDate: Yup.date()
        .required('Start date is required')
        .typeError('Invalid start date'),
    endDate: Yup.date()
        .nullable()
        .when(['currentlyWorking', 'startDate'], {
            is: (currentlyWorking: boolean, startDate: Date) => !currentlyWorking && !!startDate,
            then: (schema) =>
                schema
                    .required('End date is required')
                    .typeError('Invalid end date')
                    .min(Yup.ref('startDate'), 'End date cannot be before start date'),
            otherwise: (schema) => schema.nullable(),
        }),
    currentlyWorking: Yup.boolean(),
});

const validationSchema = Yup.object().shape({
    workExperience: Yup.array().of(workExperienceSchema),
});

const initialWorkExperience = {
    company: '',
    jobTitle: '',
    startDate: dayjs(),
    endDate: null,
    currentlyWorking: false,
};

export default function WorkExperienceForm() {
    const router = useRouter();
    const [submittedData, setSubmittedData] = useState<any>(null);

    return (
        <Box>
            <Paper elevation={3} sx={{ p: 4, maxWidth: 700, mx: 'auto', mt: 5 }}>
                <Typography variant="h5" gutterBottom>
                    Work Experience
                </Typography>

                <Formik
                    initialValues={{ workExperience: [initialWorkExperience] }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { resetForm }) => {
                        const payload = values.workExperience.map((exp) => ({
                            company: exp.company,
                            jobTitle: exp.jobTitle,
                            startDate: dayjs(exp.startDate).format('YYYY-MM-DD'),
                            endDate: exp.endDate
                                ? dayjs(exp.endDate).format('YYYY-MM-DD')
                                : null,
                            currentlyWorking: exp.currentlyWorking,
                        }));

                        try {
                            const res = await axios.post('/api/experience', payload, {
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZjdjNWU3YWE5MGVlOWNkYzEwNmE3NyIsImVtYWlsIjoidGVzdDAxQG1haWwuY29tIiwiaWF0IjoxNzQ0OTU4OTE4LCJleHAiOjE3NDU1NjM3MTh9.vGVkjSCY2LIkpdMF9L9LDSG4vf5RRuRGgoW6c8L76JQ"}`,

                                },
                            });
                            setTimeout(() => {
                                router.push("/educationform")
                            }, 1000)
                            if (!res.ok) throw new Error('Failed to submit data');
                            setSubmittedData(payload);

                            resetForm();
                        } catch (err) {
                            console.error('Error submitting data:', err);
                        }
                    }}
                >
                    {({ values, handleChange, handleSubmit, setFieldValue, touched, errors }) => (
                        <form onSubmit={handleSubmit}>
                            <FieldArray name="workExperience">
                                {({ push, remove }) => (
                                    <Stack spacing={4}>
                                        {values.workExperience.map((item, index) => {
                                            const fieldName = `workExperience.${index}`;
                                            return (
                                                <Paper
                                                    key={index}
                                                    elevation={2}
                                                    sx={{ p: 3, position: 'relative' }}
                                                >
                                                    <Stack spacing={2}>
                                                        <TextField
                                                            label="Company"
                                                            name={`${fieldName}.company`}
                                                            fullWidth
                                                            value={item.company}
                                                            onChange={handleChange}
                                                            error={
                                                                getIn(touched, `${fieldName}.company`) &&
                                                                Boolean(getIn(errors, `${fieldName}.company`))
                                                            }
                                                            helperText={
                                                                getIn(touched, `${fieldName}.company`) &&
                                                                getIn(errors, `${fieldName}.company`)
                                                            }
                                                        />

                                                        <TextField
                                                            label="Job Title"
                                                            name={`${fieldName}.jobTitle`}
                                                            fullWidth
                                                            value={item.jobTitle}
                                                            onChange={handleChange}
                                                            error={
                                                                getIn(touched, `${fieldName}.jobTitle`) &&
                                                                Boolean(getIn(errors, `${fieldName}.jobTitle`))
                                                            }
                                                            helperText={
                                                                getIn(touched, `${fieldName}.jobTitle`) &&
                                                                getIn(errors, `${fieldName}.jobTitle`)
                                                            }
                                                        />

                                                        <CustomDatePicker
                                                            formik={{ setFieldValue, errors, touched }}
                                                            label="Start Date"
                                                            name={`${fieldName}.startDate`}
                                                            value={item.startDate}
                                                        />

                                                        {!item.currentlyWorking && (
                                                            <CustomDatePicker
                                                                formik={{ setFieldValue, errors, touched }}
                                                                label="End Date"
                                                                name={`${fieldName}.endDate`}
                                                                value={item.endDate}
                                                            />
                                                        )}

                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    name={`${fieldName}.currentlyWorking`}
                                                                    checked={item.currentlyWorking}
                                                                    onChange={handleChange}
                                                                />
                                                            }
                                                            label="Currently Working"
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
                                                onClick={() => push(initialWorkExperience)}
                                            >
                                                Add More Experience
                                            </Button>
                                        </Box>

                                        <Button type="submit" variant="contained" color="primary">
                                            Submit All Experiences
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
