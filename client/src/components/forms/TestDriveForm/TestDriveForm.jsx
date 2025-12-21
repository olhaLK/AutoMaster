import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './TestDriveForm.scss';

const TestDriveSchema = Yup.object({
  fullname: Yup.string().min(3, 'Too short').max(50, 'Too long').required('Required'),
  email: Yup.string().email('Invalid email format').required('Required'),
  phone: Yup.string().matches(/^\+?\d{7,15}$/, 'Invalid phone number').required('Required'),
  // make date/time optional so user can request without selecting them
  preferredDate: Yup.date().nullable(),
  preferredTime: Yup.string().nullable(),
  comment: Yup.string().max(300, 'Comment too long'),
});

export default function TestDriveForm() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullname: '',
      email: '',
      phone: '',
      preferredDate: '',
      preferredTime: '',
      comment: '',
    },
    validationSchema: TestDriveSchema,
    onSubmit: async (values) => {
      try {
        const payload = {
          fullname: values.fullname,
          email: values.email,
          phone: values.phone,
          preferredDate: values.preferredDate || null,
          preferredTime: values.preferredTime || null,
          comment: values.comment,
        };
        await axios.post('http://localhost:3000/api/test-drives', payload);
        // navigate to tracking (orders) page after creation
        navigate('/tracking');
      } catch (err) {
        console.error('Failed to create test drive', err);
        // could show an error to user
      }
    },
  });

  return (
    <form className="test-drive-form" onSubmit={formik.handleSubmit}>
      <h3>Book a Test Drive</h3>

      <div>
        {formik.errors.fullname && <div className="error-message">{formik.errors.fullname}</div>}
        <label htmlFor="fullname">Full name:</label>
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
        <label htmlFor="email">Email:</label>
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
        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          name="phone"
          placeholder="Enter your phone number"
          value={formik.values.phone}
          onChange={formik.handleChange}
        />
      </div>

      <div>
        {formik.errors.preferredDate && <div className="error-message">{formik.errors.preferredDate}</div>}
        <label htmlFor="preferredDate">Preferred date:</label>
        <input
          type="date"
          name="preferredDate"
          value={formik.values.preferredDate}
          onChange={formik.handleChange}
        />
      </div>

      <div>
        {formik.errors.preferredTime && <div className="error-message">{formik.errors.preferredTime}</div>}
        <label htmlFor="preferredTime">Preferred time:</label>
        <input
          type="time"
          name="preferredTime"
          value={formik.values.preferredTime}
          onChange={formik.handleChange}
        />
      </div>

      <div>
        {formik.errors.comment && <div className="error-message">{formik.errors.comment}</div>}
        <label htmlFor="comment">Comment:</label>
        <textarea
          name="comment"
          placeholder="Anything else we should know..."
          value={formik.values.comment}
          onChange={formik.handleChange}
        />
      </div>

      <div className="form-actions">
        <button type="submit">Request Test Drive</button>
        <button type="button" onClick={() => navigate(-1)}>Cancel</button>
      </div>
    </form>
  );
}
