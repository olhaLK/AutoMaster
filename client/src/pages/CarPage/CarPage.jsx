import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import './CarPage.scss';

const CarPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [car, setCar] = useState(null);
    const [images, setImages] = useState([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:3000/api/cars/${id}`)
            .then(res => res.json())
            .then(data => {
                setCar(data);

                let imgs = [];

                if (Array.isArray(data.SliderImages)) {
                    imgs = data.SliderImages;
                } else if (typeof data.SliderImages === "string") {
                    try {
                        imgs = JSON.parse(data.SliderImages);
                    } catch (e) {
                        console.error("Invalid SliderImages JSON", e);
                    }
                }

                setImages(imgs);
                setIndex(0);
            });
    }, [id]);


    if (!car) {
        return <div>Loading...</div>;
    }

    console.log(car);

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
            <button onClick={() => navigate(`/test-drive/${id}`)} type="button" className="pageBtn">
                Sign up for a test drive
            </button>

        </div>
    );
};

export default CarPage;
