import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import './SignUpForm.scss';


const SignUpSheme = Yup.object({
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
    login: Yup.string().required('Required'),
    password: Yup.string().required('Required'),

})

export default function SignUpForm() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            fullname: '',
            email: '',
            phone: '',
            login: '',
            password: '',

        },
        validationSchema: SignUpSheme,
        onSubmit: values => {
            navigate('/signin');
        },
    })

    return (
        <form className="signup-form" onSubmit={formik.handleSubmit}>
            <div className="signup-container"> 
                {formik.errors.fullname && <div className="error-message">{formik.errors.fullname}</div>}
                <label htmlFor="fullname" className="signup-label">Full name: </label>
                <input
                    type="text"
                    name="fullname"
                    placeholder="Enter your full name"
                    value={formik.values.fullname}
                    onChange={formik.handleChange}
                    className="signup-input"
                />
            </div>

            <div className="signup-container">
                {formik.errors.email && <div className="error-message">{formik.errors.email}</div>}
                <label htmlFor="email" className="signup-label">Email: </label>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    className="signup-input"
                />
            </div>

            <div className="signup-container">
                {formik.errors.phone && <div className="error-message">{formik.errors.phone}</div>}
                <label htmlFor="phone" className="signup-label">Phone: </label>
                <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    className="signup-input"
                />
            </div>

            <div className="signup-container">
                {formik.errors.login && <div className='error-message'>{formik.errors.login}</div>}
                <label htmlFor="login" className="signup-label">Login</label>
                <input
                    type="text"
                    name="login"
                    placeholder="Enter login"
                    value={formik.values.login}
                    onChange={formik.handleChange}
                    className="signup-input"
                />
            </div>
            
            <div className="signup-container">
                {formik.errors.password && <div className='error-message'>{formik.errors.password}</div>}
                <label htmlFor="password" className="signup-label">Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    className="signup-input"
                />
            </div>

            <button type="submit" className="signup-btn-submit">Sign up</button>
            <button type="button" className="signup-btn-cancel" onClick={() => navigate('/')}>Cancel</button>

        </form>
    )
}