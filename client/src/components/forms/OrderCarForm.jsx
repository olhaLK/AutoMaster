import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";



const OrderCarScheme = Yup.object({
  fullname: Yup.string()
    .min(3, 'Too short')
    .max(50, 'Too long')
    .required('Required'),

  email: Yup.string()
    .email('Invalid email format')
    .required('Required'),

  phone: Yup.string()
    .matches(/^\+?\d{7,15}$/, 'Invalid phone number')
    .required('Required'),

  address: Yup.string()
    .min(5, 'Too short')
    .required('Required'),

  date: Yup.date().required('Required'),
  time: Yup.string().required('Required'),
  comment: Yup.string().max(300, 'Comment too long'),
})


export default function OrderCarPage() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullname: '',
      email: '',
      phone: '',
      address: '',
      date: '',
      time: '',
      comment: '',
    },
    validationSchema: OrderCarScheme,
    onSubmit: values => {
      //todo: this car added to the cart list
      navigate('/catalog');
    },
  })

  return (
    <form className="orderCarForm" onSubmit={formik.handleSubmit}>
      <h3>Order Car</h3>

      <div>
        {formik.errors.fullname && <div className="error-message">{formik.errors.fullname}</div>}
        <label htmlFor="fullname">Full name: </label>
        <input
          type="text"
          name="fullname"
          placeholder="Enter your full name"
          value={formik.values.fullname}
          onChange={formik.handleChange}
        />
      </div>

      <div>
        {formik.errors.email && <div className="error-message">{formik.errors.email}</div>}
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
      </div>

      <div>
        {formik.errors.phone && <div className="error-message">{formik.errors.phone}</div>}
        <label htmlFor="phone">Phone: </label>
        <input
          type="tel"
          name="phone"
          placeholder="Enter your phone number"
          value={formik.values.phone}
          onChange={formik.handleChange}
        />
      </div>

      <div>
        {formik.errors.address && <div className="error-message">{formik.errors.address}</div>}
        <label htmlFor="address">Address: </label>
        <input
          type="text"
          name="address"
          placeholder="Enter your address"
          value={formik.values.address}
          onChange={formik.handleChange}
        />
      </div>

      <div>
        {formik.errors.date && <div className="error-message">{formik.errors.date}</div>}
        <label htmlFor="date">Date: </label>
        <input
          type="date"
          name="date"
          value={formik.values.date}
          onChange={formik.handleChange}
        />
      </div>

      <div>
        {formik.errors.time && <div className="error-message">{formik.errors.time}</div>}
        <label htmlFor="time">Time: </label>
        <input
          type="time"
          name="time"
          value={formik.values.time}
          onChange={formik.handleChange}
        />
      </div>

      <div>
        {formik.errors.comment && <div className="error-message">{formik.errors.comment}</div>}
        <label htmlFor="comment">Comment: </label>
        <textarea
          name="comment"
          placeholder="Additional details..."
          value={formik.values.comment}
          onChange={formik.handleChange}
        />
      </div>

      <button type="submit">Add to cart</button>
      <button type="button" onClick={() => navigate('/catalog')}>Cancel</button>
    </form>

  )
}
