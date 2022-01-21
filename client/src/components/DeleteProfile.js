import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import { useSelector, useDispatch} from 'react-redux';
import { deleteProfile } from '../redux/profileSlice'
import { setIsUserNull } from '../redux/authSlice';
import { deleteUser } from '../redux/profileSlice';
import { useNavigate } from 'react-router-dom';
function DeleteProfile() {
    const username = useSelector(state => state.profile.profile.username);

    const dispatch = useDispatch();
    let navigate = useNavigate();
    const [handleName, setHandleName] = useState("");
    const [onClick, setOnClick] = useState(false);
    const handleChange = (e) => {
        setHandleName(e.target.value)
    }
    const handleClose = () => {
        setHandleName("")
        setOnClick(false)
    }

    const handleClick = () => setOnClick(true);

    const handleSubmit = async() => {
        await dispatch(deleteProfile(localStorage.getItem("id")))
        await setOnClick(false)
        await dispatch(setIsUserNull())
        await dispatch(deleteUser())
        localStorage.removeItem("id")
        navigate("/", { replace: true })
    }

    return (
        <>
            <Dropdown.Item onClick={handleClick}>
                Delete  Profile
            </Dropdown.Item>
            {
                <Modal show={onClick} onHide={handleClose} centered size="md">
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label className="form-label">Please type <span className='text-danger'>{username}</span> to confirm.</label>
                        <input className="form-control" type="text" onChange={(e) => handleChange(e)} />
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" onClick={handleClose}>
                            Close
                        </button>
                        <button type="submit" className="btn btn-danger" onClick={handleSubmit}  disabled={username !== handleName}>
                            Delete
                        </button>
                    </Modal.Footer>
                </Modal>
            }
        </>
    )
}

export default DeleteProfile
