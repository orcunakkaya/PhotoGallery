import React, {useState} from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { deletePhoto } from '../redux/profileSlice';

function DeletePhoto() {
    const dispatch = useDispatch();
    const images = useSelector(state => state.profile.profile.images)
    const [onClick, setOnClick] = useState(false);
    const [isSelect, setIsSelect] = useState(false);
    const [imageIndex,setImageIndex] = useState(0)
    const [handleImage, setHandleImage] = useState("");

    const handleClick = () => setOnClick(true);
    const handleClose = () => {
        setOnClick(false);
        setImageIndex(null)
        setIsSelect(false);
        setHandleImage("");
    };
    const handleSelect = (index,  image) => {
        setIsSelect(true);
        setImageIndex(index)
        setHandleImage(image)
    }
    const handleSubmit = async () => {
        const array = await images.filter(image => 
            image !== handleImage
        )
        await dispatch(deletePhoto(array))
        handleClose();
    }
    
    return (
        <>
            <Dropdown.Item onClick={handleClick}>
                Delete photo
            </Dropdown.Item>

            <Modal show={onClick} onHide={handleClose} centered size="md" scrollable>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Photo</Modal.Title>
                </Modal.Header>
                <Modal.Body scrollable="true">
                    <Table striped bordered hover>
                    <tbody>
                        {
                            images && images.map((image, index) => (
                                <tr key={index} onClick={() => handleSelect(index, image)} role="button" >
                                    <td>{index + 1}</td>
                                    <td><img alt='...' src={image} height={50} /></td>
                                </tr>
                            ))
                        }
                    </tbody>
                    </Table>
                    
                </Modal.Body>
                <Modal.Footer>
                    {
                        isSelect && (
                                <div>
                                    <label className='form-label me-md-5 d-none d-sm-inline-block'>Your choice;</label>
                                    <img className='me-md-5 ' alt="..." src={images[imageIndex]} height={50} />
                                </div>
                        )
                    }
                    <button className="btn btn-secondary" onClick={handleClose}>
                        Close
                    </button>
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit} disabled={isSelect===false}>
                        Delete
                    </button>
                </Modal.Footer>
            </Modal>
            
        </>
    )
}

export default DeletePhoto
