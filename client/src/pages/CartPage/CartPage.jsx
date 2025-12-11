
const CartPage = () => {
  return (
    <div>
      <ul>
        {/*item - car
        name
        short discription
        price
        ------
        from order get car id 
        */}
        {items.map((car, index) => (
          <li key={index}>
            <div>
              <span>{car.name}</span>
              <span>{car.short-description}</span>
            </div>

            <span>{car.price}</span>
            <button type="button" onClick={() => handleDelete}></button>            
          </li>
        )
      )}
      </ul>

      <button type="text">Pay now</button>
    </div>
  )
}

export default CartPage;
