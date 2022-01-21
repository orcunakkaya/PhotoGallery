import React, {useState} from 'react'
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';

function SearchProfileImages() {
    const [onClick, setOnClick] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);
    const images = useSelector(state => state.search.Profile.images)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleClick = (index) => {
        setOnClick(true)
        setImageIndex(index)
        setShow(true);
    }
    const handlePreviousImage = () => {
        setImageIndex(imageIndex - 1)
    }
    const handleNextImage = () => {
        setImageIndex(imageIndex + 1)
    }
    return (
        <Container className="d-flex gap-5 pt-5 justify-content-center flex-wrap profile-container">
            
            {
                images && images.map((image, index) => (
                    <img className="profile-images"
                    alt="my images" 
                    src={image} key={index} 
                    onClick={() => handleClick(index)}
                    />
                ))
            }
            {
                onClick && (
                    <Modal show={show} onHide={handleClose} centered size="xl" className="ms-auto me-auto" >
                        <Modal.Header closeButton>
                        </Modal.Header>
                        <Modal.Body className="d-flex justify-content-between align-items-center ">
                            <button className="previous-image border-0 bg-transparent" onClick={handlePreviousImage} disabled={imageIndex===0}>
                                <i className="fas fa-arrow-left"/>
                            </button>
                            <img alt="zoom" className="zoom-image" src={images[imageIndex]} />
                            <button className="next-image border-0 bg-transparent" onClick={handleNextImage} disabled={imageIndex===images.length-1}>
                                <i className="fas fa-arrow-right"/>
                            </button>
                        </Modal.Body>
                    </Modal>
                )
            }
        </Container>
    )
}

export default SearchProfileImages
