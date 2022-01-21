import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import { getUsername, changeUsername } from '../redux/profileSlice';
import { useDispatch, useSelector } from 'react-redux';

function ChangeUsername() {
    const dispatch = useDispatch();
    const isUsedUsername = useSelector(state => state.profile.isUsedUsername);
    const [onClick, setOnClick] = useState(false);
    const [newUsername, setNewUsername] = useState("");
    const [inputControl, setInputControl] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        setNewUsername(e.target.value);
    }

    useEffect(() => {
        if(newUsername.length>=5 && newUsername.length<15){
            dispatch(getUsername(newUsername));
            }
    }, [newUsername, dispatch])

    

    const handleClose = () => {
        setOnClick(false);
    }
    const handleClick = () => {
        setOnClick(true);
    }

    const handleSubmit = () => {
        setIsSubmit(true)
    }

    useEffect(() => {
        if((isUsedUsername === false) && (newUsername.length>=5) && (newUsername.length<15) && (newUsername.match(/^(\S+$)/) !== null)){
            setInputControl(true)
        }else{
            setInputControl(false)
        }
    }, [isUsedUsername, newUsername])

    useEffect(() => {
        if((isUsedUsername === false) && (isSubmit === true)){
                (async () => {
                    await dispatch(changeUsername(newUsername))
                    handleClose();
                    setIsSubmit(false);
                    setNewUsername("")
                })()
        }
    }, [isUsedUsername, dispatch, newUsername, isSubmit])

    return (
        <>
            <Dropdown.Item onClick={handleClick}>
                Change Username
            </Dropdown.Item>
            {
                <Modal show={onClick} onHide={handleClose} centered size="md">
                    <Modal.Header closeButton>
                        <Modal.Title>Change Username</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label className="form-label">New username</label>
                        <input className="form-control" type="text" onChange={(e) => handleChange(e)} />
                        <span className='d-block mt-3 text-danger'>* This field cannot contain blank spaces</span>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" onClick={handleClose}>
                            Close
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={!inputControl} onClick={handleSubmit}>
                            Change
                        </button>
                    </Modal.Footer>
                </Modal>
            
            }
        </>
    )
}

export default ChangeUsername
