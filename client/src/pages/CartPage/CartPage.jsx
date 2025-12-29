import { useState } from "react";
import { clearCart, getCart, removeFromCart } from "../../utils/cartStorage";
import axios from 'axios';


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
    <div>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <img src={item.image} width={80} />

            <div>
              <div>{item.name}</div>
              {item.type === 'test-drive' ? (
                <div>{item.date} {item.time}</div>
              ) : (
                <div>${item.price}</div>
              )}
            </div>

            <button type="button" onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {items.length > 0 && (
        <button onClick={handlePay}>Pay now</button>
      )}
    </div>
  )
}

export default CartPage;
