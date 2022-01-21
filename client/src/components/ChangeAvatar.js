import React, {useState} from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import Modal from 'react-bootstrap/Modal'
import FileBase64 from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { changeAvatar } from '../redux/profileSlice';

function ChangeAvatar() {
    const dispatch = useDispatch();
    const [onClick, setOnClick] = useState(null);
    const [isUpload, setIsUpload] = useState("false");
    const [avatar, setAvatar] = useState(null);

    const handleClose = () => {
        setIsUpload("false");
        setOnClick(false);
        setAvatar(null)
    }

    const handleClick = () => setOnClick(true)

    const handleSubmit = async() => {
        setOnClick(false);
        setIsUpload("false");
        await dispatch(changeAvatar(avatar))
        handleClose();
    }
    const handleAvatar = (base64) =>{

        const fileType = base64.split(";")[0];
        if(fileType === "data:image/png" || fileType === "data:image/jpeg" || fileType === "data:image/jpg" || fileType === "data:image/svg" || fileType === "data:image/jfif"){
            setAvatar(base64)
            setIsUpload("true");
        } 
        else{
            setIsUpload("false");
        }
    }

    const handleDelete = async() => {
        setOnClick(false);
        setIsUpload("false");
        await dispatch(changeAvatar(""))
        window.location.reload();
    }
    return (
        <>
            <Dropdown.Item onClick={handleClick}>
                Change Avatar
            </Dropdown.Item>
            {
            
                <Modal show={onClick} onHide={handleClose} centered size="md">
                    <Modal.Header closeButton>
                        <Modal.Title>Change Avatar</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FileBase64 type="file" className="form-control" onDone={({ base64 }) => {
                            handleAvatar(base64)
                            }} />
                        <span className='d-block mt-3 text-danger'>* .jpeg /.jpg /.svg /.png / .jfif</span>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" onClick={handleClose}>
                            Close
                        </button>
                        <button className="btn btn-danger" onClick={handleDelete}>Delete Avatar</button>
                        <button type="submit" className="btn btn-primary" onClick={handleSubmit} disabled={isUpload === "false"}>
                            Change
                        </button>
                    </Modal.Footer>
                </Modal>
            
            }
        </>
    )
}

export default ChangeAvatar
