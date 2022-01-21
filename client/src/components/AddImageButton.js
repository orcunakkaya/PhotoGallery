import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import { createImage } from '../redux/profileSlice';
import { useDispatch } from 'react-redux';
import FileBase64 from 'react-file-base64';
function AddImageButton() {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [isUpload, setIsUpload] = useState("false");
    const [image,setImage] = useState("");

    const handleImage = (base64) =>{
        const fileType = base64.split(";")[0];
        if(fileType === "data:image/png" || fileType === "data:image/jpeg" || fileType === "data:image/jpg" || fileType === "data:image/svg" || fileType === "data:image/jfif"){
            setImage(base64)
            setIsUpload("true");
        } 
        else{
            setIsUpload("false");
        }
        
    }
    const handleClose = () => {
        setShow(false);
        setIsUpload("false");
        setImage("")
    };

    const handleSubmit = async() => {
        await dispatch(createImage(image))
        handleClose()
    }

    const handleShow = () => setShow(true);
    return (
        <div className='ms-auto me-auto'>
                <button title="Add image"  
                    className="mt-3 border-0 add-image-button"
                    onClick = {handleShow}>
                    <i className="fas fa-plus-circle"></i>
            </button>

            <Modal show={show} onHide={handleClose} backdrop="static" aria-labelledby="contained-modal-title-vcenter"
      centered>
                <Modal.Header closeButton>
                <Modal.Title>Add New Image </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FileBase64 type="file" className="form-control" onDone={({ base64 }) => {
                         handleImage(base64)
                        }} />
                    <span className='d-block mt-3 text-danger'>* .jpeg /.jpg /.svg /.png / .jfif</span>
                </Modal.Body>
                <Modal.Footer>
                <button className="btn btn-secondary" onClick={handleClose}>
                    Close
                </button>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit} disabled={isUpload === "false"}>
                    Add Image
                </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddImageButton