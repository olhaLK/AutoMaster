import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import {PostCar} from "../../../store/features/cars.js";
import './CarForm.css'


const CarScheme = Yup.object({
    Brand: Yup.string().required("Brand is required"),
    Model: Yup.string().required("Model is required"),
    Wheeldrive: Yup.string()
        .oneOf(["FWD", "RWD", "AWD"])
        .required("Wheel drive is required"),
    Price: Yup.number().positive().required("Price is required"),
    Color: Yup.string().required("Color is required"),
    Mileage: Yup.number().min(0).required("Mileage is required"),
    ImgURL: Yup.string().url("Invalid URL").required("Main image is required"),
    SliderImages: Yup.string()
        .required("Slider images are required")
        .test("valid-json", "Must be valid JSON array", value => {
            try {
                const parsed = JSON.parse(value);
                return Array.isArray(parsed) && parsed.every(v => typeof v === "string");
            } catch {
                return false;
            }
        })
});

function CarForm() {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            Brand: "",
            Model: "",
            Wheeldrive: "",
            Price: "",
            Color: "",
            Mileage: "",
            ImgURL: "",
            SliderImages: "[]"
        },

        validationSchema: CarScheme,

        onSubmit: values => {
            dispatch(PostCar(values));
            formik.resetForm();
        }
    });

    return (
        <form className="carForm" onSubmit={formik.handleSubmit}>

            <input placeholder="Brand" {...formik.getFieldProps("Brand")} />
            <input placeholder="Model" {...formik.getFieldProps("Model")} />

            <select {...formik.getFieldProps("Wheeldrive")}>
                <option value="">Select wheel drive</option>
                <option value="FWD">FWD</option>
                <option value="RWD">RWD</option>
                <option value="AWD">AWD</option>
            </select>

            <input
                type="number"
                placeholder="Price"
                {...formik.getFieldProps("Price")}
            />

            <input
                placeholder="Color"
                {...formik.getFieldProps("Color")}
            />

            <input
                type="number"
                placeholder="Mileage"
                {...formik.getFieldProps("Mileage")}
            />

            <input
                placeholder="Main image URL"
                {...formik.getFieldProps("ImgURL")}
            />

            <textarea
                rows={3}
                placeholder='["https://img1.jpg", "https://img2.jpg"]'
                {...formik.getFieldProps("SliderImages")}
            />

            <button type="submit">Add Car</button>
        </form>
    );
}

export default CarForm;
