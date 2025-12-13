import React, {useEffect} from 'react';
import {fetchCars} from "../../store/features/cars.js";
import CarCard from "../../components/layout/CarCard/CarCard.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const CatalogPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { carsList, status, error } = useSelector(state => state.cars);
    useEffect(() => {
        dispatch(fetchCars());
    }, [dispatch]);

    if (status === "loading") return <p>Loading cars...</p>;
    if (status === "failed") return <p>Error: {error}</p>;

    const HandleNavigate = (e) => {
        e.preventDefault();
        navigate('/cars/add');
    }

    return (
        <div className="catalog-page">
            <button type="button" className="btn-add-car" onClick={HandleNavigate}>Add New Car</button>
        <div className="car-list">
            {carsList.map(car => (
                <CarCard
                    key={car._id}
                    _id={car._id}
                    name={`${car.Brand} ${car.Model}`}
                    price={car.Price}
                    mileage={car.Mileage}
                    ImgURL={car.ImgURL}
                />
            ))}
        </div>
        </div>
    );
};

export default CatalogPage;
