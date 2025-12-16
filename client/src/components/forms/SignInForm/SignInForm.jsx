import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import './SignInForm.scss';


const SignInScheme = Yup.object({
    login: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
})


export default function SignInForm() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            login: '',
            password: '',
        },
        validationSchema: SignInScheme,
        onSubmit: values => {
            //todo: ckeck user's login and password in the db 
            navigate('/');
        },
    })

    return (
        <form className="signin-form" onSubmit={formik.handleSubmit}>
            <div>
                {formik.errors.login && <div className='error-message'>{formik.errors.login}</div>}
                <label htmlFor="login">Login</label>
                <input
                    type="text"
                    name="login"
                    placeholder="Enter login"
                    value={formik.values.login}
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