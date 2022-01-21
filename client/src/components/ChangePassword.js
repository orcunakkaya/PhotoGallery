import React, { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { changePassword } from '../redux/profileSlice';

function ChangePassword() {
    const dispatch = useDispatch();
    const [onClick, setOnClick] = useState(false);
    const handleClose = () => {
        setOnClick(false)
        formik.resetForm({ password: ''})
    };
    const handleClick = () => setOnClick(true);
    const formik = useFormik({
        initialValues:{
            password: ''
        },
        validationSchema: Yup.object({
            password: Yup.string()
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
              )
        }),
        onSubmit: (async (values) =>  {
            await dispatch(changePassword(values.password));
            handleClose();
        })
    })

    return (
        <>
            <Dropdown.Item onClick={handleClick}>
                Change Password
            </Dropdown.Item>
            {
                <Modal show={onClick} onHide={handleClose} centered size="md">
                    <Modal.Header closeButton>
                        <Modal.Title>Change Password</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={formik.handleSubmit}>
                    <Modal.Body>
                        
                            <label className='form-label'>New Password</label>
                            {formik.touched.password && formik.errors.password ? 
                            <p className="error-message">{`* ${formik.errors.password}`}</p> : null}
                            <input autoFocus  value={formik.values.password} name="password" className='form-control' type="password" onChange={formik.handleChange}
                                onBlur={formik.handleBlur}  />
                        
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" onClick={handleClose}>
                            Close
                        </button>
                        <button type="submit" className="btn btn-primary" disabled = {formik.errors.password || formik.values.password===""}  >
                            Change
                        </button>
                    </Modal.Footer>
                    </form>
                </Modal>
            
            }
        </>
    )
}

export default ChangePassword
