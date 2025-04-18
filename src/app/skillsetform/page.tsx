'use client';

import {
    Box,
    Button,
    Paper,
    Stack,
    TextField,
    Typography,
    Slider,
} from '@mui/material';
import { AddCircle, Delete } from '@mui/icons-material';
import { Formik, FieldArray, getIn } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import axios from 'axios';

const skillSchema = Yup.object().shape({
    name: Yup.string().required('Skill name is required'),
    percentage: Yup.number()
        .min(1, 'Percentage must be greater than 0')
        .max(100, 'Max value is 100')
        .required('Skill percentage is required'),
});


const validationSchema = Yup.object().shape({
    skills: Yup.array().of(skillSchema),
});

const initialSkill = {
    name: '',
    percentage: 0,
};

export default function SkillsForm() {
    const [submittedData, setSubmittedData] = useState<any>(null);

    return (
        <Box>
            <Paper elevation={3} sx={{ p: 4, maxWidth: 700, mx: 'auto', mt: 5 }}>
                <Typography variant="h5" gutterBottom>
                    Skills
                </Typography>

                <Formik
                    initialValues={{ skills: [initialSkill] }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { resetForm }) => {
                        const payload = {
                            userId: '67f7c5e7aa90ee9cdc106a77',
                            skills: values.skills,
                        };

                        try {
                            const res = await axios.post('http://localhost:3000/api/skillset', payload, {
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZjdjNWU3YWE5MGVlOWNkYzEwNmE3NyIsImVtYWlsIjoidGVzdDAxQG1haWwuY29tIiwiaWF0IjoxNzQ0MzUxMjA0LCJleHAiOjE3NDQ5NTYwMDR9.yjCoF5I9b1D4BYir9N9Vx2JIFJ_UGyYrBYgUi2Lsl0c"}`,

                                },
                            });

                            if (!res.ok) throw new Error('Failed to submit skills');
                            setSubmittedData(payload);
                            resetForm();
                        } catch (error) {
                            console.error('Submission error:', error);
                        }
                    }}
                >
                    {({ values, handleChange, handleSubmit, setFieldValue, touched, errors }) => (
                        <form onSubmit={handleSubmit}>
                            <FieldArray name="skills">
                                {({ push, remove }) => (
                                    <Stack spacing={4}>
                                        {values.skills.map((item, index) => {
                                            const fieldName = `skills.${index}`;
                                            return (
                                                <Paper key={index} elevation={2} sx={{ p: 3 }}>
                                                    <Stack spacing={2}>
                                                        <TextField
                                                            label="Skill Name"
                                                            name={`${fieldName}.name`}
                                                            fullWidth
                                                            value={item.name}
                                                            onChange={handleChange}
                                                            error={
                                                                getIn(touched, `${fieldName}.name`) &&
                                                                Boolean(getIn(errors, `${fieldName}.name`))
                                                            }
                                                            helperText={
                                                                getIn(touched, `${fieldName}.name`) &&
                                                                getIn(errors, `${fieldName}.name`)
                                                            }
                                                        />

                                                        <Box>
                                                            <Typography gutterBottom>Proficiency: {item.percentage}%</Typography>
                                                            <Slider
                                                                name={`${fieldName}.percentage`}
                                                                value={item.percentage}
                                                                onChange={(_, value) =>
                                                                    setFieldValue(`${fieldName}.percentage`, value)
                                                                }
                                                                step={1}
                                                                min={0}
                                                                max={100}
                                                                valueLabelDisplay="auto"
                                                            />
                                                            {getIn(touched, `${fieldName}.percentage`) &&
                                                                getIn(errors, `${fieldName}.percentage`) && (
                                                                    <Typography color="error" variant="caption">
                                                                        {getIn(errors, `${fieldName}.percentage`)}
                                                                    </Typography>
                                                                )}
                                                        </Box>

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
                                                onClick={() => push(initialSkill)}
                                            >
                                                Add More Skill
                                            </Button>
                                        </Box>

                                        <Button type="submit" variant="contained" color="primary">
                                            Submit Skills
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
                        Submitted Skills:
                    </Typography>
                    <pre>{JSON.stringify(submittedData, null, 2)}</pre>
                </Box>
            )}
        </Box>
    );
}
