import { useNavigate, useParams } from "react-router-dom";

const CarPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBuy = () => {
    navigate(`/order/${id}`);
  }

  return (
    <div>
      <h1>Car Details for ID: {id}</h1>
      <button type="button" onClick={handleBuy}>Buy now</button>
    </div>
  );
};

export default CarPage;
