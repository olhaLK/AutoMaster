import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import './CarPage.scss';

const CarPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [car, setCar] = useState(null);
    const [images, setImages] = useState([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:3000/api/cars/${id}`)
            .then(res => res.json())
            .then(data => {
                setCar(data);
                if (
                    Array.isArray(data.SliderImages) &&
                    typeof data.SliderImages[0] === "string" &&
                    data.SliderImages[0].startsWith("[")
                ) {
                    setImages(JSON.parse(data.SliderImages[0]));
                } else {
                    setImages(data.SliderImages || []);
                }
            });
    }, [id]);

    if (!car || !images.length) {
        return <div>Loading...</div>;
    }

    const handleNext = () =>
        setIndex((prev) => (prev + 1) % images.length);

    const handlePrev = () =>
        setIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        );

    return (
        <div className="container">
            <div className="slider">
                <button onClick={handlePrev} className="prev">Prev</button>
                <img
                    src={images[index]}
                    alt=""
                    style={{ maxWidth: "500px" }}
                    className="image"
                />
                <button onClick={handleNext} className="next">Next</button>
            </div>

            <h1 className="title">{car.Brand} {car.Model}</h1>
            <p className="price">Price: {car.Price}$</p>
            <p className="color">Color: {car.Color}</p>
            <p className="mileage">Mileage: {car.Mileage} km</p>
            <p className="wheelDrive">Wheel drive: {car.Wheeldrive}</p>
            <button onClick={() => navigate(`/order/${id}`)} className="pageBtn">
                Buy now
            </button>
            <button type="button" className="pageBtn">
                Sign up for a test drive
            </button>

        </div>
    );
};

export default CarPage;
