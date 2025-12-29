import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import carOrange from "../../../assets/car-orange.png";
import carBlack from "../../../assets/car-black.png";
import "./MainSlider.scss";


const slides = [
  {
    image: carOrange,
    section: "Car Purchase",
    title: "Choose and order your car online",
    text: "Browse available vehicles, explore specifications, and submit a purchase request directly through the platform.",
    actionText: "Open Catalog",
    actionLink: "/cars",
  },
  {
    image: carBlack,
    section: "Test Drive",
    title: "Schedule a test drive",
    text: "Select a car, choose a convenient date and time, and book a test drive in just a few steps.",
    actionText: "Book Test Drive",
    actionLink: "/cars",
  },
];

const INTERVAL = 4000;
const FADE = 600;

const MainSlider = () => {
  const navigate = useNavigate();

  const [active, setActive] = useState(0);
  const [phase, setPhase] = useState("in");

  const timerRef = useRef(null);

  const scheduleNext = () => {
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setPhase("out");

      setTimeout(() => {
        setActive((prev) => (prev + 1) % slides.length);
        setPhase("in");
        scheduleNext();
      }, FADE);
    }, INTERVAL);
  }

  useEffect(() => {
    scheduleNext();
    return () => clearTimeout(timerRef.current);
  }, [])

  const slide = slides[active];

  return (
    <section className="main-slider">
      <div className="main-slider-inner">
        <div className={`main-slider-image ${phase}`}>
          <img src={slide.image} alt={slide.title} />
        </div>

        <div className={`main-slider-content ${phase}`}>
          <span className="main-slider-section">{slide.section}</span>
          <h2>{slide.title}</h2>
          <p>{slide.text}</p>

          <button
            className="main-slider-btn"
            onClick={() => navigate(slide.actionLink)}
          >
            {slide.actionText}
          </button>
        </div>
      </div>
    </section>
  )
}

export default MainSlider;
