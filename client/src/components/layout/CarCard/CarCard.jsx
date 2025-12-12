import React from 'react';
import { useNavigate } from "react-router-dom";
import './CarCard.css';

function CarCard({_id, name, price, ImgURL, mileage}) {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/cars/${_id}`);
    };

    return (
        <div className="car-card">
            <img src={ImgURL} alt={name} className="card-img" />
            <h2 className="carName">{name}</h2>
            <p className="price">{price}$</p>
            <p className="mileage">{mileage} km</p>
            <button type="button" onClick={handleNavigate} className="viewDetails">View Details</button>
        </div>
    );
}

export default CarCard;
