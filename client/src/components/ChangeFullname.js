import React, { useEffect, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import Modal from 'react-bootstrap/Modal'
import { useDispatch } from 'react-redux';
import { changeFullname } from '../redux/profileSlice';

function ChangeFullname() {
    const dispatch = useDispatch();
    const [fullname, setFullname] = useState("");
    const [onClick, setOnClick] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    const handleClick = () => setOnClick(true);
    const handleClose = () => setOnClick(false);
    const handleChange = (e) => setFullname(e.target.value);

    const handleSubmit = async () => {
        await dispatch(changeFullname(fullname.trim()));
        setOnClick(false)
        setFullname("");
    }

    useEffect(() => {
        if((fullname.length >= 5) && (fullname.length <= 15)){
            setIsDisabled(true);
        }else{
            setIsDisabled(false);
        }
    }, [fullname])
    return (
        <>
            <Dropdown.Item onClick={handleClick}>
                Change Fullname
            </Dropdown.Item>

            <Modal show={onClick} onHide={handleClose} centered size="md">
                <Modal.Header closeButton>
                    <Modal.Title>Change Fullname</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label className="form-label">New fullname</label>
                    <input className="form-control" type="text" onChange={(e) => handleChange(e)} />
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleClose}>
                        Close
                    </button>
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit} disabled={isDisabled===false}>
                        Change
                    </button>
                </Modal.Footer>
            </Modal>
        
        </>
    )
}

export default ChangeFullname
