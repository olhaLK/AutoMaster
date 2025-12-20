import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch} from 'react-redux';
import { loginUser } from '../../../store/features/users';
import * as Yup from 'yup';
import './SignInForm.scss';


const SignInScheme = Yup.object({
    email: Yup.string()
        .email('Invalid email format')
        .required('Required'),
    password: Yup.string().required('Required'),
})


export default function SignInForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: SignInScheme,
        onSubmit: values => {
            dispatch(loginUser({
                email: values.email,
                password: values.password,
            })).then(() => {navigate('/cars')})
        },
    })

    return (
        <form className="signin-form" onSubmit={formik.handleSubmit}>
            <div>
                {formik.errors.email && <div className='error-message'>{formik.errors.email}</div>}
                <label htmlFor="email">E-mail</label>
                <input
                    type="text"
                    name="email"
                    placeholder="E-mail"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                />
            </div>

            <div>
                {formik.errors.password && <div className='error-message'>{formik.errors.password}</div>}
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                />
            </div>

            <div>
                <label>Haven't you registered yet?</label>
                <a href="/signup">Sign up</a>
            </div>

            <button type="submit">Sign in</button>
            <button type="button" onClick={() => navigate('/')}>Cancel</button>
        </form>
    )
}