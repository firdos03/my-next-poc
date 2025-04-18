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
import * as Yup from 'yup'

// Validation Schema using Yup
const validationSchema = Yup.object({
    fullName: Yup.string()
        .required('Full name is required')
        .min(3, 'Too short'),
    profileImage: Yup.string()
        .url('Must be a valid URL')
        .nullable(),
    location: Yup.string().required('Location is required'),
    designation: Yup.string().required('Designation is required'),
    mobileNumber: Yup.string()
        .required('Mobile number is required')
        .matches(/^[0-9]{10}$/, 'Must be a valid 10-digit number'),
})

export default function UserForm() {
    const postUserData = async (userData: any) => {
        try {
            const response = await axios.post(
                "http://localhost:3000/api/userprofile",
                userData,
                {
                    headers: {
                        Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZjdjNWU3YWE5MGVlOWNkYzEwNmE3NyIsImVtYWlsIjoidGVzdDAxQG1haWwuY29tIiwiaWF0IjoxNzQ0MzUxMjA0LCJleHAiOjE3NDQ5NTYwMDR9.yjCoF5I9b1D4BYir9N9Vx2JIFJ_UGyYrBYgUi2Lsl0c"}`,
                        'Content-Type': 'application/json',
                    },
                }
            )

            

            console.log('User data posted successfully:', response.data)
        } catch (error) {
            console.error('Error posting user data:', error)
        }
    }
    return (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 500, mx: 'auto', mt: 8 }}>
            <Typography variant="h5" component="h1" gutterBottom align="center">
                User Profile Form
            </Typography>

            <Formik
                initialValues={{
                    fullName: '',
                    profileImage: '',
                    location: '',
                    designation: '',
                    mobileNumber: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    console.log('Submitted values:', values)
                    setSubmitting(false)
                    postUserData(values)
                }}
            >
                {({
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    values,
                    isSubmitting,
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

                            <TextField
                                label="Profile Image URL"
                                name="profileImage"
                                fullWidth
                                value={values.profileImage}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.profileImage && Boolean(errors.profileImage)}
                                helperText={touched.profileImage && errors.profileImage}
                            />

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
    )
}
