"use client";
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker as MUIDatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

type Props = {
    formik: any;
    label: string;
    name: string;
    value: any | null;
};

const CustomDatePicker: React.FC<Props> = ({ formik, label, name, value }) => {
    const { setFieldValue, setFieldTouched, touched, errors } = formik;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MUIDatePicker
                label={label}
                value={value ? dayjs(value) : null}
                onChange={(date) => setFieldValue(name, date)}
                onBlur={() => setFieldTouched(name, true)}
                slotProps={{
                    textField: {
                        fullWidth: true,
                        error: touched[name] && Boolean(errors[name]),
                        helperText: touched[name] && errors[name],
                    },
                }}
            />
        </LocalizationProvider>
    );
};

export default CustomDatePicker;
