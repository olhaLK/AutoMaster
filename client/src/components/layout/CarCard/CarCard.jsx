import React from 'react';
import { useNavigate } from "react-router-dom";

function CarCard({_id, name, price, ImgURL, mileage}) {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/cars/${_id}/details`);
    };

    return (
        <div>
            <img src={ImgURL} alt={name} />
            <h2>{name}</h2>
            <p>{price}$</p>
            <p>{mileage} km</p>
            <button type="button" onClick={handleNavigate}>View Details</button>
        </div>
    );
}

export default CarCard;
