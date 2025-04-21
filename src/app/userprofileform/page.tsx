'use client'

import {
    Button,
    TextField,
    Typography,
    Paper,
    Stack,
} from '@mui/material'
import axios from 'axios'
import { Formik, Form } from 'formik'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import Loader from '../components/Loader'
import { log } from 'node:console'

const validationSchema = Yup.object({
    fullName: Yup.string()
        .required('Full name is required')
        .min(3, 'Too short'),

    profileImage: Yup.mixed()
        .nullable()
        .test('fileSize', 'File too large', value =>
            !value || (value instanceof File && value.size <= 5 * 1024 * 1024)
        )
        .test('fileType', 'Unsupported file format', value =>
            !value || (value instanceof File &&
                ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'].includes(value.type))
        ),

    location: Yup.string().required('Location is required'),
    designation: Yup.string().required('Designation is required'),
    mobileNumber: Yup.string()
        .required('Mobile number is required')
        .matches(/^[0-9]{10}$/, 'Must be a valid 10-digit number'),
});

export default function UserForm() {
    const [loader, setLoader] = useState(false);
    const router = useRouter();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("useId");

    const postUserData = async (userData: any) => {
        setLoader(true);
        try {
            const formData = new FormData();
            for (const key in userData) {
                formData.append(key, userData[key]);
            }
            console.log("formData", formData);
            const payLoad = {
                ...formData, userId
            }
            console.log("payLoad", payLoad);
            const response = await axios.post(
                "http://localhost:3000/api/userprofile",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            console.log('User data posted successfully:', response.data);
            router.push("/workexperienceform");
        } catch (error) {
            console.error('Error posting user data:', error)
        } finally {
            setLoader(false);
        }
    }

    return (
        <>
            {(loader) ? <Loader /> : (
                <Paper elevation={3} sx={{ p: 4, maxWidth: 500, mx: 'auto', mt: 8 }}>
                    <Typography variant="h5" component="h1" gutterBottom align="center">
                        User Profile Form
                    </Typography>

                    <Formik
                        initialValues={{
                            fullName: '',
                            profileImage: null,
                            location: '',
                            designation: '',
                            mobileNumber: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            postUserData(values).finally(() => {
                                setSubmitting(false);
                            });
                        }}
                    >
                        {({
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            values,
                            isSubmitting,
                            setFieldValue,
                        }) => (
                            <Form noValidate>
                                <Stack spacing={3}>
                                    <TextField
                                        label="Full Name"
                                        name="fullName"
                                        fullWidth
                                        value={values.fullName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.fullName && Boolean(errors.fullName)}
                                        helperText={touched.fullName && errors.fullName}
                                    />

                                    <input
                                        accept="image/*"
                                        type="file"
                                        name="profileImage"
                                        onChange={(event) => {
                                            const file = event.currentTarget.files?.[0];
                                            setFieldValue("profileImage", file);
                                        }}
                                        onBlur={handleBlur}
                                        style={{ marginTop: 8 }}
                                    />
                                    {touched.profileImage && errors.profileImage && (
                                        <div style={{ color: 'red', fontSize: '0.85rem' }}>
                                            {errors.profileImage}
                                        </div>
                                    )}

                                    <TextField
                                        label="Location"
                                        name="location"
                                        fullWidth
                                        value={values.location}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.location && Boolean(errors.location)}
                                        helperText={touched.location && errors.location}
                                    />

                                    <TextField
                                        label="Designation"
                                        name="designation"
                                        fullWidth
                                        value={values.designation}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.designation && Boolean(errors.designation)}
                                        helperText={touched.designation && errors.designation}
                                    />

                                    <TextField
                                        label="Mobile Number"
                                        name="mobileNumber"
                                        fullWidth
                                        value={values.mobileNumber}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.mobileNumber && Boolean(errors.mobileNumber)}
                                        helperText={touched.mobileNumber && errors.mobileNumber}
                                    />

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        disabled={isSubmitting}
                                    >
                                        Submit
                                    </Button>
                                </Stack>
                            </Form>
                        )}
                    </Formik>
                </Paper>
            )}
        </>
    );
}
