"use client";
import React from 'react';
import {
    Box,
    Button,
    Container,
    Grid,
    TextField,
    Typography,
    MenuItem,
    InputLabel,
    Select,
    FormControl,
    Avatar,
    Paper,
    Autocomplete,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const educationOptions = ['High School', 'Diploma', "Bachelor's", 'Master\'s', 'PhD'];
const skillsList = ['JavaScript', 'React', 'Node.js', 'Python', 'TypeScript', 'SQL', 'CSS', 'HTML'];
const popularIndianCities = [
    "Mumbai",
    "Delhi",
    "Bengaluru",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Surat",
    "Lucknow",
    "Chandigarh",
    "Bhopal",
    "Indore",
    "Nagpur",
    "Patna",
    "Visakhapatnam",
    "Kanpur",
    "Coimbatore",
    "Thiruvananthapuram",
    "Vijayawada",
    "Ludhiana",
    "Guwahati",
    "Rajkot",
    "Amritsar",
    "Varanasi",
    "Mysore",
    "Dehradun",
    "Noida",
    "Faridabad"
];

const schema = yup.object().shape({
    fullName: yup.string().required('Full name is required'),
    designation: yup.string().required('Designation is required'),
    experience: yup.string().required('Work experience is required'),
    education: yup.string().required('Education is required'),
    dob: yup.string().required('Date of Birth is required'),
    skills: yup.array().min(1, 'Select at least one skill'),
    location: yup.string().required('Location is required'),
    mobile: yup
        .string()
        .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
        .required('Mobile number is required'),
    profileImage: yup.mixed().required('Profile image is required'),
});

const ProfileForm = () => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            skills: [],
        },
    });

    const onSubmit = (data: any) => {
        console.log('Form Data:', data);
        alert('Form Submitted!');
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue('profileImage', file);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ py: 6 }}>
            <Paper elevation={3} sx={{
                p: 4, background: 'linear-gradient(to right, #e3f2fd, #ffffff)',
                borderRadius: 3,
                boxShadow: 2,
            }}>
                <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
                    User Profile
                </Typography>
                <Typography variant="body1" textAlign="center" color="text.secondary" mb={4}>
                    Fill out your details to build your profile.
                </Typography>

                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Grid item xs={12} sx={{mb: 4}}>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <Button variant="outlined" component="label">
                                Upload Profile Image
                                <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
                            </Button>

                            {watch('profileImage') && (
                                <Box mt={2} display="flex" alignItems="center" gap={2}>
                                    <Avatar
                                        src={URL.createObjectURL(watch('profileImage') as File)}
                                        alt="Profile"
                                        sx={{ width: 60, height: 60 }}
                                    />
                                    <Typography>{(watch('profileImage') as File)?.name}</Typography>
                                </Box>
                            )}
                            {errors.profileImage && (
                                <Typography color="error" fontSize="0.8rem" mt={1}>
                                    {errors.profileImage.message as string}
                                </Typography>
                            )}
                        </Box>
                    </Grid>


                    <Grid container spacing={3} direction="column">
                        <Grid item xs={12}>
                            <TextField
                                label="Full Name"
                                fullWidth
                                {...register('fullName')}
                                error={!!errors.fullName}
                                helperText={errors.fullName?.message}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Designation"
                                fullWidth
                                {...register('designation')}
                                error={!!errors.designation}
                                helperText={errors.designation?.message}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Total Work Experience (e.g. 3 years)"
                                fullWidth
                                {...register('experience')}
                                error={!!errors.experience}
                                helperText={errors.experience?.message}
                            />
                        </Grid>

                        {/* <Grid item xs={12}>
                            <FormControl fullWidth error={!!errors.education}>
                                <InputLabel>Highest Education</InputLabel>
                                <Select
                                    label="Highest Education"
                                    defaultValue=""
                                    {...register('education')}
                                >
                                    {educationOptions.map((edu) => (
                                        <MenuItem key={edu} value={edu}>
                                            {edu}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <Typography color="error" fontSize="0.8rem">
                                    {errors.education?.message}
                                </Typography>
                            </FormControl>
                        </Grid> */}

                        {/* <Grid item xs={12}>
                            <TextField
                                label="Date of Birth"
                                type="date"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                {...register('dob')}
                                error={!!errors.dob}
                                helperText={errors.dob?.message}
                            />
                        </Grid> */}

                        {/* <Grid item xs={12}>
                            <FormControl fullWidth error={!!errors.skills}>
                                <Controller
                                    name="skills"
                                    control={control}
                                    render={({ field }) => (
                                        <Autocomplete
                                            multiple
                                            options={skillsList}
                                            value={field.value || []}
                                            onChange={(_, value) => field.onChange(value)}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Skills"
                                                    error={!!errors.skills}
                                                    helperText={errors.skills?.message}
                                                />
                                            )}
                                        />
                                    )}
                                />
                            </FormControl>
                        </Grid> */}

                        <Grid item xs={12}>
                            <Controller
                                name="location"
                                control={control}
                                render={({ field }) => (
                                    <Autocomplete
                                        options={popularIndianCities}
                                        value={field.value || ''}
                                        onChange={(_, value) => field.onChange(value)}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Location"
                                                fullWidth
                                                error={!!errors.location}
                                                helperText={errors.location?.message}
                                            />
                                        )}
                                    />
                                )}
                            />
                        </Grid>


                        <Grid item xs={12}>
                            <TextField
                                label="Mobile Number"
                                fullWidth
                                {...register('mobile')}
                                error={!!errors.mobile}
                                helperText={errors.mobile?.message}
                                type="number"
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
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" size="large" fullWidth sx={{ mt: 2 }}>
                                Next
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
};

export default ProfileForm;
