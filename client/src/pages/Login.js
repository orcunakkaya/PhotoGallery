import React, {useState} from 'react'
import FormText from 'react-bootstrap/FormText';
import { Link } from 'react-router-dom';
import { useFormik } from  'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { findUser } from '../redux/authSlice';
import { Navigate } from 'react-router';
const Login = () => {
    const dispatch = useDispatch();
    const isUser = useSelector(state => state.auth.isUser);
    const [eye, setEye] = useState(false);
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .min(5, 'Must be 5 characters or more')
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            password: Yup.string()
                .min(5, 'Must be 5 characters or more')
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
        }),
        onSubmit: (values) => {
            dispatch(findUser(values))
            formik.resetForm({username: '', password: ''})
        }
    })

    if(isUser){
        return <Navigate replace={true} to='/profile'/>
    }


    return (
        <form className="auth min-vh-100" onSubmit={formik.handleSubmit}>
            {
                isUser === false && 
                <div className="alert alert-danger fade show">
                    *You have entered incorrectly, please check your information.
                </div>
            }
            <div className="mb-3" >
                <label className="form-label">User Name</label>
                <input autoComplete="off" className="form-control"
                value={formik.values.username}
                type="text" 
                name="username" 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter User Name" />
            </div>
            {formik.touched.username && formik.errors.username ? 
            <p className="error-message">{`* ${formik.errors.username}`}</p> : null}
            <div className="mb-3">
                <label className="form-label">Password</label>
                <div >
                <input className="form-control" 
                value={formik.values.password}
                autoComplete="off"
                type={`${eye ? "text" : "password"}`} name="password" 
                onChange={formik.handleChange} 
                onBlur={formik.handleBlur}
                placeholder="Password" />
                {
                    eye ? <i onClick={() => setEye(false)} className="far fa-eye-slash"></i>
                    : <i onClick={() => setEye(true)} className="far fa-eye"></i>
                }
                </div>
            </div>
            {formik.touched.password && formik.errors.password ? 
            <p className="error-message">{`* ${formik.errors.password}`}</p> : null}
            <button className="btn btn-outline-primary" type="submit">
                Log in
            </button>
            <FormText className="text-muted d-block mt-3">
                Don't you have an account? <Link to="/signup">Sign up</Link>
            </FormText>
        </form>
    )
}

export default Login;
