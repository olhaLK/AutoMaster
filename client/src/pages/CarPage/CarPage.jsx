import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

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
        <div>
            <div className="slider">
                <button onClick={handlePrev}>Prev</button>
                <img
                    src={images[index]}
                    alt=""
                    style={{ maxWidth: "500px" }}
                />
                <button onClick={handleNext}>Next</button>
            </div>

            <h1>{car.Brand} {car.Model}</h1>
            <button onClick={() => navigate(`/order/${id}`)}>
                Buy now
            </button>
        </div>
    );
};

export default CarPage;
