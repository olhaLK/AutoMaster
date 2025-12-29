import { useState } from "react";
import { clearCart, getCart, removeFromCart } from "../../utils/cartStorage";
import axios from 'axios';
import "./CartPage.scss";


const CartPage = () => {
  const [items, setItems] = useState(getCart());

  const handleDelete = (id) => {
    removeFromCart(id);
    setItems(getCart());
  }

  const handlePay = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    await axios.post('http://localhost:3000/api/pay', {
      items,
      userId: user?.id,
    })

    clearCart();
    setItems([]);
  }

  return (
    <div className="cart">
      <h1 className="cart-title">Cart</h1>

      {items.length === 0 ? (
        <div className="cart-empty">Your cart is empty</div>
      ) : (
        <>
          <ul className="cart-list">
            {items.map((item) => (
              <li className="cart-item" key={`${item.type}-${item.id}`}>
                <img className="cart-img" src={item.image} alt={item.name} />

                <div className="cart-info">
                  <p className="cart-name">{item.name}</p>
                  <p className="cart-meta">
                    {item.type === "test-drive"
                      ? `${item.date || ""} ${item.time || ""}`.trim()
                      : "Purchase"}
                  </p>
                </div>

                <div className="cart-price">
                  {item.type === "test-drive" ? "$50" : `$${item.price}`}
                </div>

                <div className="cart-actions">
                  <button
                    className="cart-btn"
                    type="button"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <button className="cart-pay" onClick={handlePay}>
            Pay now
          </button>
        </>
      )}
    </div>
  )
}

export default CartPage;
