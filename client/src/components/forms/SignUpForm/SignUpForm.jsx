import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../store/features/users";
import * as Yup from "yup";
import './SignUpForm.scss';


const SignUpSheme = Yup.object({
    login: Yup.string().required('Required'),
    email: Yup.string()
        .email('Invalid email format')
        .required('Required'),
    phone: Yup.string()
        .matches(/^\+?\d{7,15}$/, 'Invalid phone number')
        .required('Required'),
    password: Yup.string().required('Required'),

})

export default function SignUpForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            login: '',
            email: '',
            phone: '',
            password: '',
            role: 'User',
        },
        validationSchema: SignUpSheme,
        onSubmit: values => {
            const payload = {
                UserName: values.login,
                Email: values.email,
                Phone: values.phone,
                Password: values.password,
                Role: values.role,
            }

            dispatch(registerUser(payload));
            navigate('/signin');
        },
    })

    return (
        <form className="signup-form" onSubmit={formik.handleSubmit}>
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

            <div className="signup-container">
                <label htmlFor="role" className="signup-label">Role</label>
                <select
                    name="role"
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    className="signup-input"
                >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                </select>
            </div>

            <button type="submit" className="signup-btn-submit">Sign up</button>
            <button type="button" className="signup-btn-cancel" onClick={() => navigate('/')}>Cancel</button>

        </form>
    )
}