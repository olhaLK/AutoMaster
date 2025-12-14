import React from 'react';
import EditCarForm from "../../components/forms/EditCarForm/EditCarForm.jsx";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";

function EditCar() {
    const { id } = useParams();

    const car = useSelector(state =>
        state.cars.carsList.find(c => c._id === id)
    );

    if (!car) return <p>Loading...</p>;
    return (
        <div>
            <EditCarForm car={car}/>
        </div>
    );
}

export default EditCar;