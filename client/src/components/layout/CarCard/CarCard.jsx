import React from 'react';
import { useNavigate } from "react-router-dom";
import './CarCard.css';
import {useDispatch} from "react-redux";
import {DeleteCar} from "../../../store/features/cars.js";

function CarCard({_id, name, price, ImgURL, mileage}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleNavigate = (e) => {
        e.preventDefault();
        navigate(`/cars/${_id}`);
    };

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(DeleteCar(_id));
    };

    const handleEdit = (e) => {
        e.preventDefault();
        navigate(`/car/${_id}/edit`);
    }

    return (
        <div className="car-card">
            <img src={ImgURL} alt={name} className="card-img" />
            <h2 className="carName">{name}</h2>
            <p className="price">{price}$</p>
            <p className="mileage">{mileage} km</p>

            <button type="button" onClick={handleNavigate} className="viewDetails">View Details</button>

            <button className="deleteBtn" onClick={handleDelete}>X</button>
            <button className="editBtn" onClick={handleEdit}>Edit</button>
        </div>
    );
}

export default CarCard;
