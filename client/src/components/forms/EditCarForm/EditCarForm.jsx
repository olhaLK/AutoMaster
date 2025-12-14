import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {useDispatch} from "react-redux";
import {UpdateCar} from "../../../store/features/cars.js";
import './EditCarForm.css'
import {normalizeSliderImages} from "../../../functions/forforms.js";


const CarSchema = Yup.object({
    Brand: Yup.string().required("Brand is required"),
    Model: Yup.string().required("Model is required"),
    Wheeldrive: Yup.string()
        .oneOf(["FWD", "RWD", "AWD"])
        .required("Wheel drive is required"),
    Price: Yup.number().positive().required("Price is required"),
    Color: Yup.string().required("Color is required"),
    Mileage: Yup.number().min(0).required("Mileage is required"),
    ImgURL: Yup.string().url("Invalid URL").required("Main image is required"),
    SliderImages: Yup.string().required("Slider images are required")
});

export default function EditCarForm({ car }) {
    const dispatch = useDispatch();
    const formik = useFormik({
        enableReinitialize: true,

        initialValues: {
            Brand: car?.Brand || "",
            Model: car?.Model || "",
            Wheeldrive: car?.Wheeldrive || "",
            Price: car?.Price || "",
            Color: car?.Color || "",
            Mileage: car?.Mileage || "",
            ImgURL: car?.ImgURL || "",
            SliderImages: normalizeSliderImages(car?.SliderImages)
        },

        validationSchema: CarSchema,

        onSubmit: values => {
            const payload = {
                ...car,
                ...values,
                SliderImages: values.SliderImages
                    .split(",")
                    .map(v => v.trim())
            };
            dispatch(UpdateCar(payload));


        }
    });

    if (!car) return null;

    return (
        <form className="car-form" onSubmit={formik.handleSubmit}>

            <input {...formik.getFieldProps("Brand")} placeholder="Brand" />
            <input {...formik.getFieldProps("Model")} placeholder="Model" />

            <select {...formik.getFieldProps("Wheeldrive")}>
                <option value="">Select wheel drive</option>
                <option value="FWD">FWD</option>
                <option value="RWD">RWD</option>
                <option value="AWD">AWD</option>
            </select>

            <input
                type="number"
                {...formik.getFieldProps("Price")}
                placeholder="Price"
            />

            <input {...formik.getFieldProps("Color")} placeholder="Color" />

            <input
                type="number"
                {...formik.getFieldProps("Mileage")}
                placeholder="Mileage"
            />

            <input
                {...formik.getFieldProps("ImgURL")}
                placeholder="Main image URL"
            />

            <textarea
                rows={3}
                {...formik.getFieldProps("SliderImages")}
                placeholder="Slider images URLs (comma separated)"
            />

            <button type="submit">Save changes</button>
        </form>
    );
}
