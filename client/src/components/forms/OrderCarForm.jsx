import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";



const OrderCarScheme = Yup.object({

})


export default function OrderCarPage() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullname: '',
      email: '',
      phone: '',
      adress: '',
      date: '',
      time: '',
      comment: '',
    },
    validationSchema: OrderCarScheme,
  })
  return (
    <form className="orderCarForm">
      <h3>Order Car</h3>

      <input />

      <button type="button">Add to cart</button>
      <button type="button" onClick={() => navigate('/')}>Cancel</button>
    </form>

  )
}
