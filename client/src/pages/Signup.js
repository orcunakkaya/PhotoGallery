import React, {useState} from 'react'
import FormText from 'react-bootstrap/FormText';
import { Link, Navigate } from 'react-router-dom';
import { useFormik } from  'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../redux/authSlice';
const Signup = () => {

    const dispatch = useDispatch();
    const isCreated =  useSelector(state => state.auth.isCreated);
    const [eye, setEye] = useState(false);
    const formik = useFormik({
        initialValues: {
            username: '',
            fullName: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .matches(/^(\S+$)/, 'This field cannot contain blank spaces')
                .min(5, 'Must be 5 characters or more')
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            fullName: Yup.string()
                .min(5, 'Must be 5 characters or more')
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            password: Yup.string()
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
              ),
        }),
        onSubmit: (async (values) =>  {
            dispatch(createUser(values))
            formik.resetForm({username: '', fullName: '', password: ''})
        })
    })

    if(isCreated === true){
        return <Navigate to="/profile" />
    }

    return (
        <form className="auth min-vh-100" onSubmit={formik.handleSubmit} >
            {
                isCreated === false && 
                <div className="alert alert-danger fade show">Username is already in use</div>
            }
            <div className="mb-3" >
                <label className="form-label">User Name</label>
                <input value={formik.values.username} 
                autoComplete="off" className="form-control" 
                type="text" name="username" 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur} 
                placeholder="Enter User Name" />
            </div>
            {formik.touched.username && formik.errors.username ? 
            <p className="error-message">{`* ${formik.errors.username}`}</p> : null}
            <div className="mb-3" >
                <label className="form-label">Full Name</label>
                <input value={formik.values.fullName} 
                autoComplete="off" className="form-control" 
                type="text" name="fullName" 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur} 
                placeholder="Enter Full Name" />
            </div>
            {formik.touched.fullName && formik.errors.fullName ? 
            <p className="error-message">{`* ${formik.errors.fullName}`}</p> : null}
            <div className="mb-3">
                <label className="form-label">Password</label>
                <div>
                    <input value={formik.values.password} 
                    className="form-control" type={`${eye ? "text" : "password"}`} 
                    name="password" 
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
            <button className="btn btn-outline-primary" type="submit" disabled={formik.isSubmitting} >
                Sign up
            </button>
            <FormText className="text-muted d-block mt-3">
             Do you already have an account? <Link to="/login">Log in</Link>
            </FormText>
        </form>
    )
}

export default Signup;
